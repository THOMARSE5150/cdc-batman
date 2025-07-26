import { OAuth2Client } from 'google-auth-library';
import { z } from 'zod';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `https://celiacounselling.thomarse5150.repl.co/api/auth/google/callback`
);

export const googleAuthHandler = {
  getAuthUrl() {
    return client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar.readonly'
      ]
    });
  },

  async handleCallback(code: string) {
    const { tokens } = await client.getToken(code);
    return tokens;
  }
};