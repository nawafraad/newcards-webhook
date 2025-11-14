const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// استقبال RAW BODY من MyFatoorah
app.use(express.text({ type: "*/*" }));

// صفحة اختبار بسيطة
app.get('/', (req, res) => {
    res.send('NewCards Webhook is running ✅');
});

// مسار استقبال Webhook من MyFatoorah
app.post('/api/webhooks/myfatoorah', (req, res) => {

    console.log("========== WEBHOOK RECEIVED ==========");
    console.log("📌 RAW BODY FROM MYFATOORAH:");
    console.log(req.body);

    try {
        // Parse main body
        const data = JSON.parse(req.body);

        // Extract main event data
        const d = data.Data;

        // Parse embedded CustomerReference (if JSON)
        let customerRef = {};
        try { 
            customerRef = JSON.parse(d.CustomerReference); 
        } catch (e) {}

        console.log("---------- CLEAN DATA ----------");
        const clean = {
            invoiceId: d.InvoiceId,
            invoiceRef: d.InvoiceReference,
            customerName: d.CustomerName,
            customerMobile: d.CustomerMobile,
            customerEmail: d.CustomerEmail,
            paymentMethod: d.PaymentMethod,
            transactionStatus: d.TransactionStatus,
            paymentId: d.PaymentId,
            trackId: d.TrackId,
            amount: d.InvoiceValue,
            currency: d.InvoiceDisplayCurrency,
            customerReference: customerRef
        };

        console.log(clean);

    } catch (err) {
        console.log("❌ ERROR PARSING WEBHOOK:", err.message);
    }

    console.log("========== END WEBHOOK ==========\n");

    // Always respond 200 OK
    res.sendStatus(200);
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
