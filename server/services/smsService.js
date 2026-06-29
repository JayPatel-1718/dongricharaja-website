/**
 * smsService.js
 * Modular SMS service. Uses Twilio when credentials are configured,
 * otherwise falls back to a console simulation so local dev is never blocked.
 */
const Twilio = require('twilio');

class SmsService {
  constructor() {
    this.provider     = 'Simulated';
    this.twilioClient = null;

    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN  &&
      process.env.TWILIO_FROM_NUMBER &&
      !process.env.TWILIO_ACCOUNT_SID.startsWith('your_')
    ) {
      try {
        this.twilioClient = Twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );
        this.provider = 'Twilio';
        console.log('[SMS Service] Twilio provider initialised');
      } catch (err) {
        console.error('[SMS Service] Twilio init failed:', err.message);
      }
    } else {
      console.log('[SMS Service] No Twilio credentials – running in simulation mode');
    }
  }

  /**
   * Format phone number to E.164 (+91XXXXXXXXXX for Indian numbers).
   */
  _formatPhone(phone) {
    const cleaned = phone.trim().replace(/\s+/g, '').replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+')) return cleaned;
    if (cleaned.length === 10) return `+91${cleaned}`;
    return `+${cleaned}`;
  }

  /**
   * Send a donation receipt SMS containing the receipt URL.
   * @param {Object} opts
   * @param {string} opts.donorPhone
   * @param {string} opts.donorName
   * @param {string} opts.receiptNo
   * @param {number} opts.amountPaid
   * @param {string} opts.receiptUrl  – permanent PDF / receipt-page URL
   * @returns {Promise<{success: boolean, provider: string, messageId?: string, error?: string}>}
   */
  async sendDonationReceipt({ donorPhone, donorName, receiptNo, amountPaid, receiptUrl }) {
    const formattedPhone = this._formatPhone(donorPhone);

    const body =
`\uD83D\uDE4F Thank you for your generous donation to Dongri Cha Raja.

Receipt No: ${receiptNo}
Amount: \u20B9${Number(amountPaid).toLocaleString('en-IN')}

Download your official receipt here:
${receiptUrl}

May Lord Ganesha bless you and your family.
\u2014 Dongri Cha Raja`;

    if (this.provider === 'Twilio' && this.twilioClient) {
      try {
        const msg = await this.twilioClient.messages.create({
          body,
          from: process.env.TWILIO_FROM_NUMBER,
          to:   formattedPhone,
        });
        return { success: true, provider: 'Twilio', messageId: msg.sid };
      } catch (err) {
        console.error('[SMS Service] Twilio send failed:', err.message);
        return { success: false, provider: 'Twilio', error: err.message };
      }
    }

    // ── Simulation mode ──────────────────────────────────────────────
    console.log('\n===== SMS SIMULATION =====');
    console.log(`To : ${formattedPhone}`);
    console.log(`URL: ${receiptUrl}`);
    console.log('Body:\n' + body);
    console.log('==========================\n');

    return {
      success:   true,
      provider:  'Simulated',
      messageId: `sim_${Date.now()}`,
    };
  }
}

module.exports = new SmsService();
