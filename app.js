const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = 8000;

// MongoDB connection URL (updated with the database name)
const mongourl = "mongodb+srv://saravanan:saran2005@cluster0.1d6gi.mongodb.net/Expense-Tracker";

app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and Amount are required" });
    }

    const newExpense = new Expense({
      id: uuidv4(),
      title: title,
      amount: amount,
    });

    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/api/expensesAll", async (req, res) => {
  const expense = await Expense.find({});

  if (expense) {
      res.status(200).json(expense);
  }
});

app.get("/api/expensesbyId/:id", async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findOne({ id });

    if (expense) {
        res.status(200).json(expense);
    }
});

app.put("/api/expensesUpdate/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const updatedExpense = await Expense.findOneAndUpdate(
      { id },
      updates,
      { new: true }
    );

    if (updatedExpense) {
        res.status(200).json(updatedExpense);
    }
});


app.delete("/api/expensesdeletebyId/:id", async (req, res) => {
    const { id } = req.params;
      const result = await Expense.deleteOne({ id });
  
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Expense not found" });
      }
  });

  app.delete("/api/expensesdeleteAll", async (req, res) => {
      const result = await Expense.deleteMany({});
  
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Expense not found" });
      }
  });
