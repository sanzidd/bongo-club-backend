const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for image uploads

// MongoDB Connection
// IMPORTANT: Replace <db_password> with your actual MongoDB password
const MONGO_URI = 'mongodb+srv://sanzidis99_db_user:sanzidMONGOdb@proj1.2pgqduk.mongodb.net/?appName=PROJ1';

mongoose.connect(MONGO_URI, { family: 4 })
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.log('MongoDB Connection Error:', err));

// --- Schemas ---
const MemberSchema = new mongoose.Schema({
    id: Number,
    name: String,
    role: String,
    phone: String,
    image: String,
    balance: Number
});

const EventSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    date: String,
    fee: Number,
    bkashNumber: String,
    status: String,
    createdAt: String
});

const PaymentSchema = new mongoose.Schema({
    id: Number,
    eventId: Number,
    memberId: Number,
    amount: Number,
    transactionId: String,
    date: String,
    status: String
});

const ExpenseSchema = new mongoose.Schema({
    id: Number,
    eventId: Number,
    description: String,
    amount: Number
});

const ClubInfoSchema = new mongoose.Schema({
    description: String,
    area: String
});

const Member = mongoose.model('Member', MemberSchema);
const Event = mongoose.model('Event', EventSchema);
const Payment = mongoose.model('Payment', PaymentSchema);
const Expense = mongoose.model('Expense', ExpenseSchema);
const ClubInfo = mongoose.model('ClubInfo', ClubInfoSchema);

// --- Routes ---

// Get All Data (Initial Load)
app.get('/api/data', async (req, res) => {
    try {
        const members = await Member.find();
        const events = await Event.find();
        const payments = await Payment.find();
        const expenses = await Expense.find();
        let clubInfo = await ClubInfo.findOne();
        
        if (!clubInfo) {
            clubInfo = { description: "", area: "" };
            await new ClubInfo(clubInfo).save();
        }

        res.json({ members, events, payments, expenses, clubInfo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Members
app.post('/api/members', async (req, res) => {
    const newMember = new Member(req.body);
    await newMember.save();
    res.json(newMember);
});

app.put('/api/members/:id', async (req, res) => {
    await Member.findOneAndUpdate({ id: req.params.id }, req.body);
    res.json({ success: true });
});

app.delete('/api/members/:id', async (req, res) => {
    await Member.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
});

// Events
app.post('/api/events', async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
});

// KEEP ONLY THIS ONE - DELETE THE OTHER
app.put('/api/events/:id', async (req, res) => {
    const updatedEvent = await Event.findOneAndUpdate(
        { id: req.params.id }, 
        req.body,
        { new: true }
    );
    res.json(updatedEvent);
});

app.delete('/api/events/:id', async (req, res) => {
    await Event.findOneAndDelete({ id: req.params.id });
    await Payment.deleteMany({ eventId: req.params.id });
    await Expense.deleteMany({ eventId: req.params.id });
    res.json({ success: true });
});
// Payments
app.post('/api/payments', async (req, res) => {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.json(newPayment);
});

app.put('/api/payments/:id', async (req, res) => {
    await Payment.findOneAndUpdate({ id: req.params.id }, req.body);
    res.json({ success: true });
});

// Expenses
app.post('/api/expenses', async (req, res) => {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.json(newExpense);
});

app.delete('/api/expenses/:id', async (req, res) => {
    await Expense.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
});

// Club Info
app.post('/api/club-info', async (req, res) => {
    // We update the single document
    await ClubInfo.deleteMany({}); 
    const info = new ClubInfo(req.body);
    await info.save();
    res.json(info);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
