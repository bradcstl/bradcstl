CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    package_name VARCHAR(255) NOT NULL,
    destination_id INT,
    hotel_id INT,
    price DECIMAL(10, 2) NOT NULL,
    nights INT NOT NULL,
    exclusive_offer_id INT,
    hotel_description TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    FOREIGN KEY (exclusive_offer_id) REFERENCES offers(id)
);