const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// مسار بسيط للتأكد إن السيرفر شغّال
app.get('/', (req, res) => {
  res.send('NewCards Webhook is running ✅');
});

// مسار الويبهوك مع استقبال RAW BODY كنص
app.post(
  '/api/webhooks/myfatoorah',
  express.text({ type: '*/*' }),
  (req, res) => {
    console.log('========== WEBHOOK RECEIVED ==========');
    console.log('📌 RAW BODY FROM MYFATOORAH:');
    console.log(req.body);
    console.log('========== END WEBHOOK ==========');

    res.sendStatus(200);
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
