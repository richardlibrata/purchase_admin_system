const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const [products] = await db.query('SELECT * FROM products');
  const [stocks] = await db.query('SELECT * FROM stocks');
  res.render('index', {
    products,
    stocks,
    currentPage: 'index'
  });
});

router.post('/purchase', async (req, res) => {
  const { productId, quantity } = req.body;
  const [rows] = await db.query('SELECT quantity FROM stocks WHERE product_id = ?', [productId]);
  const remainingStock = rows[0]?.quantity ?? 0;

  if (quantity > remainingStock) {
    // Too much: redirect with error
    const [products] = await db.query('SELECT * FROM products');
    const [stocks] = await db.query('SELECT * FROM stocks');
    return res.render('index', {
      products,
      stocks,
      currentPage: 'index',
      errorMessage: 'Purchase quantity exceeds remaining stock.'
    });
  }

  if (rows.length && rows[0].quantity >= quantity) {
    await db.query('INSERT INTO purchases (product_id, quantity) VALUES (?, ?)', [productId, quantity]);
    await db.query('UPDATE stocks SET quantity = quantity - ? WHERE product_id = ?', [quantity, productId]);
  }

  res.redirect('/');
});

router.get('/purchases', async (req, res) => {
  const [purchases] = await db.query(`
    SELECT purchases.*, products.name AS productName FROM purchases JOIN products ON purchases.product_id = products.id ORDER BY purchases.date DESC`);
  res.render('purchases', { purchases, currentPage: 'purchases' });
});

router.delete('/purchase/:id', async (req, res) => {
  const purchaseId = req.params.id;

  const [[purchase]] = await db.query('SELECT * FROM purchases WHERE id = ?', [purchaseId]);
  if (purchase) {
    await db.query('UPDATE stocks SET quantity = quantity + ? WHERE product_id = ?', [purchase.quantity, purchase.product_id]);
    await db.query('DELETE FROM purchases WHERE id = ?', [purchaseId]);
  }

  res.redirect('/purchases');
});

module.exports = router;
