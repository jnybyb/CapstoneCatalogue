-- Capstone Catalogue Database Schema

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `capstone_catalogue`;
USE `capstone_catalogue`;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_number VARCHAR(20) UNIQUE NOT NULL COMMENT 'Format: JUL24-001, MONYEAR-INCREMENT',
    title VARCHAR(255) NOT NULL,
    month_year VARCHAR(20) NOT NULL COMMENT 'Format: July 2024',
    abstract_link VARCHAR(500) COMMENT 'Google Drive link',
    binding_type ENUM('Hardbound', 'Softbound') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create faculty table
CREATE TABLE IF NOT EXISTS faculty (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) COMMENT 'Adviser, Chair Panel, Panel Member, Thesis Coordinator, Program Head, Dean',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create project_authors junction table (1 to many: 1 project has 1-4 authors)
CREATE TABLE IF NOT EXISTS project_authors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    author_id INT NOT NULL,
    author_order INT COMMENT 'Order of authors (1, 2, 3, 4)',
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_author (project_id, author_id)
);

-- Create project_faculty junction table (many to many: project has multiple faculty roles)
CREATE TABLE IF NOT EXISTS project_faculty (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    faculty_id INT NOT NULL,
    role VARCHAR(100) NOT NULL COMMENT 'Adviser, Chair Panel, Panel Member, Thesis Coordinator, Program Head, Dean',
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_faculty_role (project_id, faculty_id, role)
);

