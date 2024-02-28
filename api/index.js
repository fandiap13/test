import express from "express";
import { db } from "./db.js";
import { check, validationResult } from "express-validator";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8800;

db.connect((err) => {
  if (err) {
    console.log("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

app.get("/api/customers", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query =
    "SELECT customers.id, customers.created_at, customers.updated_at, customers.name, customers.quantity, customers.total_transaction, menu.name as favorite_menu, level.name as level FROM customers JOIN menu ON menu.id = customers.menu_id JOIN level ON customers.level_id = level.id ORDER BY customers.created_at DESC LIMIT ?,?";

  db.query(query, [offset, limit], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error !" });

    // ambil jumlah total data
    db.query(
      "SELECT COUNT(*) as totalCount FROM customers JOIN menu ON menu.id = customers.menu_id JOIN level ON customers.level_id = level.id",
      (err, resultCount) => {
        if (err)
          return res.status(500).json({ error: "Internal Server Error !" });

        const totalCount = resultCount[0].totalCount;
        const totalPages = Math.ceil(totalCount / limit);

        // Membuat array links
        const links = [];
        const baseUrl =
          req.protocol +
          "://" +
          req.get("host") +
          req.originalUrl.split("?")[0]; // Mengambil URL tanpa query string
        if (page > 1) {
          links.push({
            url: baseUrl + `?page=${page - 1}&limit=${limit}`,
            rel: "prev",
            title: "Previous Page",
          });
        }
        links.push({
          url: baseUrl + `?page=${page}&limit=${limit}`,
          rel: "current",
          title: page,
        });
        if (page < totalPages) {
          links.push({
            url: baseUrl + `?page=${page + 1}&limit=${limit}`,
            rel: "next",
            title: "Next Page",
          });
        }
        // Tambahkan 3 halaman mendatang jika ada
        for (let i = page + 1; i <= Math.min(page + 3, totalPages); i++) {
          links.push({
            url: baseUrl + `?page=${i}&limit=${limit}`,
            rel: "",
            title: `${i}`,
          });
        }

        // Response dengan data yang dipaginasi beserta links
        res.json({
          totalItems: totalCount,
          page: page,
          totalPages: totalPages,
          data: data,
          links: links,
        });
      }
    );
  });
});

app.post("/api/customers", (req, res) => {
  const search = req.body.search ?? "";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const query =
    "SELECT customers.id, customers.created_at, customers.updated_at, customers.name, customers.quantity, customers.total_transaction, menu.name as favorite_menu, level.name as level FROM customers JOIN menu ON menu.id = customers.menu_id JOIN level ON customers.level_id = level.id WHERE customers.name LIKE ? ORDER BY customers.created_at DESC LIMIT ?,?";
  const searchTerm = "%" + search + "%";

  db.query(query, [searchTerm, offset, limit], (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error !" });

    // ambil jumlah total data
    db.query(
      "SELECT COUNT(*) as totalCount FROM customers JOIN menu ON menu.id = customers.menu_id JOIN level ON customers.level_id = level.id WHERE customers.name LIKE ?",
      [searchTerm],
      (err, resultCount) => {
        if (err)
          return res.status(500).json({ error: "Internal Server Error !" });

        const totalCount = resultCount[0].totalCount;
        console.log(totalCount);
        var totalPages;
        if (totalCount <= limit) {
          totalPages = 1;
        } else {
          totalPages = Math.ceil(totalCount / limit);
        }
        // console.log(totalCount);
        // Membuat array links
        const links = [];
        const baseUrl =
          req.protocol +
          "://" +
          req.get("host") +
          req.originalUrl.split("?")[0]; // Mengambil URL tanpa query string
        if (page > 1) {
          links.push({
            url: baseUrl + `?page=${page - 1}&limit=${limit}`,
            rel: "prev",
            title: "Previous Page",
          });
        }
        links.push({
          url: baseUrl + `?page=${page}&limit=${limit}`,
          rel: "current",
          title: page,
        });
        if (page < totalPages) {
          links.push({
            url: baseUrl + `?page=${page + 1}&limit=${limit}`,
            rel: "next",
            title: "Next Page",
          });
        }
        // Tambahkan 3 halaman mendatang jika ada
        for (let i = page + 1; i <= Math.min(page + 3, totalPages); i++) {
          links.push({
            url: baseUrl + `?page=${i}&limit=${limit}`,
            rel: "",
            title: `${i}`,
          });
        }

        // Response dengan data yang dipaginasi beserta links
        res.json({
          totalItems: totalCount,
          page: page,
          totalPages: totalPages,
          data: data,
          links: links,
        });
      }
    );
  });
});

app.get("/api/customer/:id", (req, res) => {
  // const query =
  //   "SELECT customers.id, customers.created_at, customers.updated_at, customers.name, customers.quantity, customers.total_transaction, menu.name as favorite_menu, level.name as level FROM customers JOIN menu ON menu.id = customers.menu_id JOIN level ON customers.level_id = level.id WHERE customers.id = ?";
  const query =
    "SELECT customers.*, menu.name as favorite_menu, level.name as level FROM customers JOIN menu ON menu.id = customers.menu_id JOIN level ON customers.level_id = level.id WHERE customers.id = ?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
});

app.get("/api/menu", (req, res) => {
  const query = "SELECT * FROM menu";

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

app.get("/api/level", (req, res) => {
  const query = "SELECT * FROM level";

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

app.post(
  "/api/add_customer",
  [
    check("name").notEmpty().withMessage("Nama tidak boleh kosong"),
    check("menu_id").notEmpty().withMessage("Menu tidak boleh kosong"),
    check("level_id").notEmpty().withMessage("Level tidak boleh kosong"),
    check("quantity")
      .notEmpty()
      .withMessage("Kuantitas tidak boleh kosong")
      .isNumeric()
      .withMessage("Kuantitas harus dalam bentuk angka"),
    check("total_transaction")
      .notEmpty()
      .withMessage("Total transaksi tidak boleh kosong")
      .isNumeric()
      .withMessage("Total transaksi harus dalam bentuk angka"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace("T", " ");

    const values = [
      formattedDateTime,
      req.body.name,
      req.body.menu_id,
      req.body.quantity,
      req.body.total_transaction,
      req.body.level_id,
    ];

    const query =
      "INSERT INTO `customers` (`created_at`, `name`, `menu_id`, `quantity`, `total_transaction`, `level_id`) VALUES (?)";

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res
        .status(200)
        .json({ message: "Customer berhasil ditambahkan !", data: data });
    });
  }
);

app.put(
  "/api/update_customer/:id",
  [
    check("name").notEmpty().withMessage("Nama tidak boleh kosong"),
    check("menu_id").notEmpty().withMessage("Menu tidak boleh kosong"),
    check("level_id").notEmpty().withMessage("Level tidak boleh kosong"),
    check("quantity")
      .notEmpty()
      .withMessage("Kuantitas tidak boleh kosong")
      .isNumeric()
      .withMessage("Kuantitas harus dalam bentuk angka"),
    check("total_transaction")
      .notEmpty()
      .withMessage("Total transaksi tidak boleh kosong")
      .isNumeric()
      .withMessage("Total transaksi harus dalam bentuk angka"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check user
    db.query(
      "SELECT * FROM customers WHERE id = ?",
      [req.params.id],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (!data[0]) {
          return res
            .status(404)
            .json({ message: "Customer tidak ditemukan !" });
        }

        const now = new Date();
        const values = [
          now,
          req.body.name,
          req.body.menu_id,
          req.body.quantity,
          req.body.total_transaction,
          req.body.level_id,
          req.params.id,
        ];

        const query =
          "UPDATE customers SET updated_at=?,name=?,menu_id=?,quantity=?,total_transaction=?,level_id=? WHERE customers.id=?";

        db.query(query, [...values], (err, data) => {
          if (err) return res.status(500).json(err);

          return res
            .status(200)
            .json({ message: "Customer berhasil diubah !" });
        });
      }
    );
  }
);

app.delete("/api/customer/delete/:id", (req, res) => {
  const query = "DELETE FROM customers WHERE id=?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Customer berhasil dihapus!" });
  });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
