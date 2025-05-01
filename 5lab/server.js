const express = require('express');
const cors    = require('cors');
const path    = require('path');
const admin   = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// GET
app.get('/api/completed-goals', async (req, res) => {
  const { uid } = req.query;
  try {
    const snap = await db
      .collection(`users/${uid}/goals`)
      .where('status', '==', 'completed')
      .get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST
app.post('/api/completed-goals', async (req, res) => {
  const { uid, goalId } = req.body;
  try {
    const goalRef = db.doc(`users/${uid}/goals/${goalId}`);
    await goalRef.update({
      status: 'completed',
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    const updated = (await goalRef.get()).data();
    res.json({ id: goalId, ...updated });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.use(
  express.static(path.join(__dirname, 'myway-react', 'build'))
);

app.use((req, res) => {
    res.sendFile(
     path.join(__dirname, 'myway-react', 'build', 'index.html')
   );
 });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
