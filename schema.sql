CREATE TABLE IF NOT EXISTS imc_calculations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_age INTEGER NOT NULL,
    user_sex TEXT NOT NULL,
    user_height REAL NOT NULL,
    user_weight REAL NOT NULL,
    imc_result REAL NOT NULL,
    imc_class TEXT NOT NULL,
    ideal_weight REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);