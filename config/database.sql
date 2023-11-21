CREATE DATABASE book_store;
CREATE TABLE books(
    id BIGSERIAL PRIMARY KEY,
    title CHAR(100) NOT NULL,
    description TEXT NOT NULL,
    author CHAR(50) NOT NULL,
    price INT NOT NULL, 
    isbn BIGINT NOT NULL,
    page INT NOT NULL,
    photo CHAR(250) NOT NULL
);