import { logger } from '../utils/logger';

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
  }>;
}

interface AIResponse {
  message: string;
  urgencyLevel: number;
  shouldEscalate: boolean;
  suggestedActions: string[];
  resources: string[];
}

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      logger.warn('GEMINI_API_KEY not provided - AI chat will use fallback responses', 'GEMINI');
    }
  }

  private getMentalHealthSystemPrompt(): string {
    return `You are Compass, an AI assistant for Celia Dunsmore Counselling, a professional mental health practice in Melbourne, Australia. 

IMPORTANT GUIDELINES:
- You are NOT a replacement for professional therapy or counselling
- Always encourage users to book appointments with Celia for serious concerns
- Be warm, empathetic, and supportive but maintain professional boundaries
- Recognize signs of crisis and recommend immediate professional help
- Provide information about services, booking, and general wellness support

CELIA'S PRACTICE INFO:
- Location: Brunswick & Coburg, Melbourne
- Services: Individual counselling, couples therapy, anxiety, depression, trauma support
- Phone: (03) 9041 5031
- Email: hello@celiadunsmorecounselling.com.au
- Session fee: $225.57 (Medicare rebate available: $88.20)
- Booking: Through Halaxy online system

CRISIS INDICATORS (urgency level 8-10):
- Mentions of self-harm, suicide, or wanting to die
- Immediate danger to self or others
- Severe mental health crisis
- Substance abuse emergencies

MODERATE CONCERN (urgency level 5-7):
- Persistent anxiety or depression
- Relationship difficulties
- Work/life stress
- Grief and loss

LOW CONCERN (urgency level 1-4):
- General wellness questions
- Service information
- Booking assistance
- General coping strategies

RESPONSE FORMAT:
Provide supportive, professional responses. For crisis situations, immediately recommend calling emergency services (000) or Lifeline (13 11 14).

Always respond with empathy while being clear about your limitations as an AI assistant.`;
  }

  private analyzeUrgencyLevel(message: string): number {
    const lowerMessage = message.toLowerCase();
    
    // Crisis indicators (8-10)
    const crisisKeywords = [
      'suicide', 'kill myself', 'end my life', 'want to die', 'self-harm', 'cut myself',
      'overdose', 'can\'t go on', 'no point living', 'better off dead'
    ];
    
    // High concern (6-7)
    const highConcernKeywords = [
      'panic attack', 'can\'t cope', 'breakdown', 'severe anxiety', 'severe depression',
      'trauma', 'ptsd', 'abuse', 'domestic violence'
    ];
    
    // Moderate concern (4-5)
    const moderateConcernKeywords = [
      'anxious', 'depressed', 'stressed', 'overwhelmed', 'sad', 'worried',
      'relationship problems', 'grief', 'loss'
    ];

    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 9;
    }
    
    if (highConcernKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 6;
    }
    
    if (moderateConcernKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 4;
    }
    
    return 2; // General inquiry
  }

  private generateSuggestedActions(urgencyLevel: number): string[] {
    if (urgencyLevel >= 8) {
      return [
        'Call emergency services (000) immediately if in immediate danger',
        'Contact Lifeline: 13 11 14',
        'Call Celia directly: (03) 9041 5031',
        'Go to your nearest emergency department'
      ];
    }
    
    if (urgencyLevel >= 5) {
      return [
        'Book an appointment with Celia: (03) 9041 5031',
        'Consider contacting your GP',
        'Call Beyond Blue: 1300 22 4636',
        'Practice grounding techniques'
      ];
    }
    
    return [
      'Book a session to discuss further',
      'Try the suggested coping strategies',
      'Consider our online booking system',
      'Explore our service information'
    ];
  }

  private generateResources(urgencyLevel: number): string[] {
    if (urgencyLevel >= 8) {
      return [
        'Emergency Services: 000',
        'Lifeline: 13 11 14',
        'Crisis Text Line: Text HELLO to 741741',
        'Mental Health Emergency Response Line: 1300 555 788'
      ];
    }
    
    if (urgencyLevel >= 5) {
      return [
        'Beyond Blue: 1300 22 4636',
        'Headspace: headspace.org.au',
        'SANE Australia: 1800 18 7263',
        'MindSpot Online Therapy: mindspot.org.au'
      ];
    }
    
    return [
      'Celia Dunsmore Counselling services',
      'Medicare mental health plan information',
      'Mindfulness and grounding techniques',
      'Local support groups in Melbourne'
    ];
  }

  async generateResponse(userMessage: string, context?: any): Promise<AIResponse> {
    const urgencyLevel = this.analyzeUrgencyLevel(userMessage);
    const shouldEscalate = urgencyLevel >= 8;

    try {
      if (!this.apiKey) {
        throw new Error('API key not available');
      }

      const requestBody: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: `${this.getMentalHealthSystemPrompt()}\n\nUser message: "${userMessage}"\n\nProvide a supportive, professional response appropriate for a mental health practice assistant.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500
        }
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Gemini API');
      }

      const aiMessage = data.candidates[0].content.parts[0].text;

      logger.info(`Gemini response generated (urgency: ${urgencyLevel})`, 'GEMINI', {
        userMessageLength: userMessage.length,
        responseLength: aiMessage.length,
        urgencyLevel,
        shouldEscalate
      });

      return {
        message: aiMessage,
        urgencyLevel,
        shouldEscalate,
        suggestedActions: this.generateSuggestedActions(urgencyLevel),
        resources: this.generateResources(urgencyLevel)
      };

    } catch (error) {
      logger.error('Error generating Gemini response', 'GEMINI', { error: error instanceof Error ? error.message : 'Unknown error' });
      
      // Fallback response based on urgency
      return this.getFallbackResponse(userMessage, urgencyLevel);
    }
  }

  private getFallbackResponse(userMessage: string, urgencyLevel: number): AIResponse {
    const shouldEscalate = urgencyLevel >= 8;

    let fallbackMessage: string;

    if (urgencyLevel >= 8) {
      fallbackMessage = "I'm concerned about what you've shared. Please reach out for immediate support - call emergency services (000) if you're in immediate danger, or contact Lifeline at 13 11 14. You can also call Celia directly at (03) 9041 5031. Your safety and wellbeing are the top priority.";
    } else if (urgencyLevel >= 5) {
      fallbackMessage = "Thank you for reaching out. It sounds like you're going through a difficult time. I'd encourage you to book an appointment with Celia to discuss this further - you can call (03) 9041 5031. In the meantime, remember that support is available through Beyond Blue (1300 22 4636) if you need to talk to someone.";
    } else {
      fallbackMessage = "Hello! I'm here to help with information about Celia Dunsmore Counselling. You can book appointments by calling (03) 9041 5031 or through our online booking system. Sessions are $225.57 with Medicare rebates available. How else can I assist you today?";
    }

    return {
      message: fallbackMessage,
      urgencyLevel,
      shouldEscalate,
      suggestedActions: this.generateSuggestedActions(urgencyLevel),
      resources: this.generateResources(urgencyLevel)
    };
  }

  async healthCheck(): Promise<{ status: string; apiKeyConfigured: boolean }> {
    return {
      status: this.apiKey ? 'configured' : 'fallback_mode',
      apiKeyConfigured: !!this.apiKey
    };
  }
}

export default new GeminiService();