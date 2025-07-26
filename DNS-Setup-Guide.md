# DNS Configuration Guide for celiadunsmorecounselling.com.au

## IMMEDIATE ACTION REQUIRED: DNS Records Setup

Based on the SEO audit, these DNS records are needed to improve your website's security score and email deliverability.

---

## 📋 STEP-BY-STEP DNS SETUP

### Step 1: Access Your Domain Management
1. Log in to your domain registrar (where you purchased celiadunsmorecounselling.com.au)
2. Navigate to DNS Management or DNS Records section
3. Look for options to add TXT records

### Step 2: Add SPF Record
**Record Type:** TXT  
**Name/Host:** @ (or celiadunsmorecounselling.com.au)  
**Value:** `v=spf1 include:_spf.google.com ~all`  
**TTL:** 3600 (or leave default)

**What this does:** Prevents email spoofing by specifying which servers can send email on your behalf

### Step 3: Add DMARC Record
**Record Type:** TXT  
**Name/Host:** _dmarc  
**Value:** `v=DMARC1; p=none; rua=mailto:hello@celiadunsmorecounselling.com.au; ruf=mailto:hello@celiadunsmorecounselling.com.au; fo=1`  
**TTL:** 3600 (or leave default)

**What this does:** Provides email authentication reporting and policy enforcement

---

## 🔧 COMMON DOMAIN REGISTRARS - WHERE TO FIND DNS

### GoDaddy
1. Login → My Products → Domain Portfolio
2. Click domain name → DNS Management
3. Add Record → Type: TXT

### Namecheap  
1. Login → Domain List → Manage
2. Advanced DNS tab
3. Add New Record → Type: TXT

### Cloudflare
1. Login → Select domain
2. DNS tab → Add record
3. Type: TXT

### Google Domains
1. Login → My domains
2. DNS tab → Custom records
3. Add → Type: TXT

---

## ✅ VERIFICATION CHECKLIST

After adding records, verify they're working:

### SPF Record Check
1. Go to: https://mxtoolbox.com/spf.aspx
2. Enter: celiadunsmorecounselling.com.au
3. Should show: "v=spf1 include:_spf.google.com ~all"

### DMARC Record Check  
1. Go to: https://mxtoolbox.com/dmarc.aspx
2. Enter: celiadunsmorecounselling.com.au
3. Should show your DMARC policy

---

## ⏰ PROPAGATION TIME

**DNS changes typically take:**
- 15 minutes to 1 hour: Most changes visible
- 24-48 hours: Full global propagation
- Test after 1 hour, then again after 24 hours

---

## 🎯 EXPECTED SEO IMPROVEMENTS

After DNS setup:
- **Security Score:** Improved significantly 
- **Email Deliverability:** Much better
- **Professional Credibility:** Enhanced
- **SEO Ranking:** Small positive impact

---

## 🆘 TROUBLESHOOTING

**Problem:** Can't find DNS management  
**Solution:** Contact your domain registrar's support

**Problem:** Record not showing up after 24 hours  
**Solution:** Check for typos, ensure correct record type (TXT)

**Problem:** Multiple SPF records  
**Solution:** Combine into one SPF record, don't create duplicates

---

## 📞 QUICK REFERENCE

**Your Domain:** celiadunsmorecounselling.com.au  
**Your Email:** hello@celiadunsmorecounselling.com.au  

**SPF Record:**  
Name: @  
Value: `v=spf1 include:_spf.google.com ~all`

**DMARC Record:**  
Name: _dmarc  
Value: `v=DMARC1; p=none; rua=mailto:hello@celiadunsmorecounselling.com.au; ruf=mailto:hello@celiadunsmorecounselling.com.au; fo=1`

---

This setup will address the "Add an SPF record" and "Add a DMARC mail record" recommendations from your SEO audit, helping improve your overall security score.