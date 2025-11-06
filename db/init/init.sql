CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('user', 'organizer', 'admin')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, email, password_hash, role) VALUES
('jan_novak', 'jan.novak@email.com', 'hashed_password_123', 'user'),
('ana_kovač', 'ana.kovac@email.com', 'hashed_password_456', 'user'),
('rock_band', 'info@rockband.com', 'hashed_password_789', 'organizer'),
('tech_meetup', 'hello@techmeetup.si', 'hashed_password_abc', 'organizer'),
('admin_sys', 'admin@events.si', 'hashed_password_admin', 'admin');

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

INSERT INTO categories (name, description) VALUES
('Koncerti', 'Različni glasbeni dogodki in koncerti v živo.'),
('Tehnologija', 'Tech meetupi, konference in delavnice.'),
('Šport', 'Športni dogodki, tekmovanja in maratoni.'),
('Umetnost', 'Razstave, galerije in umetniške delavnice.');


CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    organizer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(category_id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(200),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO events (organizer_id, category_id, title, description, location, start_time, end_time, image_url) VALUES
(3, 1, 'Rock Night 2024', 'Neverjeten večer z najboljšimi rock skupinami v državi.', 'Stadion Stožice, Ljubljana', '2024-08-15 20:00:00', '2024-08-15 23:30:00', 'https://example.com/images/rock_night.jpg'),
(4, 2, 'AI & Future Tech Conference', 'Konference o umetni inteligenci in prihodnosti tehnologije.', 'Cankarjev dom, Ljubljana', '2024-09-10 09:00:00', '2024-09-10 18:00:00', 'https://example.com/images/ai_conf.jpg'),
(3, 1, 'Summer Jazz Festival', 'Sprostite se ob hladnih jazz melodiijah poletne noči.', 'Križanke, Ljubljana', '2024-07-20 19:00:00', '2024-07-20 22:00:00', 'https://example.com/images/jazz_fest.jpg'),
(4, 2, 'Web Development Workshop', 'Praktična delavnica za moderne tehnologije spletnega razvoja.', 'Tehnološki park Ljubljana', '2024-10-05 10:00:00', '2024-10-05 16:00:00', 'https://example.com/images/web_dev.jpg');


CREATE TABLE IF NOT EXISTS ticket_types (
    ticket_type_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    type_name VARCHAR(50),
    price DECIMAL(10,2),
    quantity INT
);


INSERT INTO ticket_types (event_id, type_name, price, quantity) VALUES
(1, 'Standard', 25.00, 200),
(1, 'VIP', 60.00, 50),
(2, 'Zgodnja prijava', 50.00, 100),
(2, 'Redna vstopnica', 75.00, 150),
(3, 'General Admission', 20.00, 150),
(4, 'Student', 30.00, 40),
(4, 'Redna vstopnica', 50.00, 80);

CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    ticket_type_id INT REFERENCES ticket_types(ticket_type_id),
    quantity INT CHECK (quantity > 0),
    status VARCHAR(20) CHECK (status IN ('confirmed', 'cancelled', 'pending')) DEFAULT 'confirmed',
    booking_date TIMESTAMP DEFAULT NOW()
);


INSERT INTO bookings (user_id, event_id, ticket_type_id, quantity, status) VALUES
(1, 1, 1, 2, 'confirmed'), -- Jan Novak kupi 2 standardni vstopnici na Rock Night
(2, 2, 3, 1, 'confirmed'), -- Ana Kovač kupi 1 zgodnjo prijavo na AI konferenco
(1, 3, 5, 4, 'pending'),   -- Jan Novak ima nepotrjeno rezervacijo za Jazz Festival
(2, 1, 2, 1, 'cancelled'); -- Ana Kovač je preklicala VIP vstopnico


CREATE TABLE IF NOT EXISTS favorites (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, event_id)
);



INSERT INTO favorites (user_id, event_id) VALUES
(1, 2), -- Jan Novak ima rad AI konferenco
(1, 3), -- Jan Novak ima rad Jazz Festival
(2, 1), -- Ana Kovač ima rada Rock Night
(2, 4); -- Ana Kovač ima rada Web Development delavnico


CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO reviews (event_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Neverjeten dogodek! Glasba je bila odlična, atmosfera nepozabna.'),
(1, 2, 4, 'Zelo dober koncert, vendar so bile vrste za pijačo predolge.'),
(2, 1, 5, 'Zelo informativna konferenca. Predavatelji so bili vrhunski.');


CREATE TABLE IF NOT EXISTS notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    event_id INT REFERENCES events(event_id),
    message TEXT,
    sent_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);


INSERT INTO notifications (user_id, event_id, message, is_read) VALUES
(1, 1, 'Vaša rezervacija za "Rock Night 2024" je potrjena!', true),
(1, 3, 'Opomnik: Jazz Festival se začne čez 3 dni.', false),
(2, 2, 'Hvala za udeležbo na AI konferenci. Ali bi radi ocenili dogodek?', false);



CREATE TABLE IF NOT EXISTS messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    event_id INT REFERENCES events(event_id),
    subject VARCHAR(200),
    body TEXT,
    sent_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);


INSERT INTO messages (sender_id, receiver_id, event_id, subject, body, is_read) VALUES
(3, 1, 1, 'Sprememba urnika Rock Night', 'Spoštovani, koncert se bo začel 30 minut prej. Lep pozdrav, Rock Band ekipa.', false),
(1, 3, 1, 'Vprašanje o parkiranju', 'Ali je na voljo parkirni prostor ob stadionu?', true),
(4, 2, 2, 'Potrditev udeležbe', 'Spoštovana, potrjujemo vašo udeležbo na AI konferenci.', true);