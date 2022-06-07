const {Room, Booking } = require('./index');

const roomTemplate = {
    name: 'Ocean View Suite',
    rate: 20100,
    discount: 0.2,
}
test('No existen reservas para esa habitación - Porcentaje de ocupación 0%', () => {
    const room = new Room({...roomTemplate, bookings: []})
    expect(room.isOccupied(new Date(2022, 11, 3))).toBe(false);
    expect(room.occupancyPercentage(new Date(2022, 11, 3), new Date(2022, 12, 3))).toBe(0);
});

test('Un Booking - La habitación está disponible', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.isOccupied(new Date(2022, 12, 7))).toBe(false);
});

test('Un Booking - La habitación está ocupada - Porcentaje de Ocupación 100%', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.isOccupied(new Date(2022, 11, 3))).toBe("Levi Jacobson");
  expect(room.occupancyPercentage(new Date(2022, 11, 1), new Date(2022, 11, 3))).toBe(100);
});

test('Un booking - La habitación está ocupada - Porcentaje de Ocupación 0%', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.isOccupied(new Date(2022, 11, 3))).toBe("Levi Jacobson");
  expect(room.occupancyPercentage(new Date(2022, 12, 1), new Date(2022, 12, 3))).toBe(0);
});

test('Un booking - La habitación está ocupada - Porcentaje de Ocupación 50%', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1);
  expect(room.isOccupied(new Date(2022, 11, 3))).toBe("Levi Jacobson");
  expect(room.occupancyPercentage(new Date(2022, 11, 1), new Date(2022, 11, 7))).toBe(50);
});

test('Varios Bookings - La habitación está disponible - Ocupación junio 50%', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 7, 1),
    checkout: new Date(2022, 7, 16),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 10, 1),
    checkout: new Date(2022, 10, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 9, 1),
    checkout: new Date(2022, 9, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.isOccupied(new Date(2022, 12, 3))).toBe(false);
  expect(room.occupancyPercentage(new Date(2022, 7, 1), new Date(2022, 7, 31))).toBe(50);
});

test('Varios Bookings - La habitación está ocupada - Ocupación en agosto 10%', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 7, 1),
    checkout: new Date(2022, 7, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 9, 1),
    checkout: new Date(2022, 9, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.isOccupied(new Date(2022, 7, 3))).toBe("Katie Mitchell");
  expect(room.occupancyPercentage(new Date(2022, 9, 1), new Date(2022, 9, 31))).toBe(10);
});

test('Varios Bookings - La habitación está ocupada - Ocupación en agosto 0%', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 11, 1),
    checkout: new Date(2022, 11, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 7, 1),
    checkout: new Date(2022, 7, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 8, 1),
    checkout: new Date(2022, 8, 4),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.isOccupied(new Date(2022, 7, 3))).toBe("Katie Mitchell");
  expect(room.occupancyPercentage(new Date(2022, 9, 1), new Date(2022, 9, 31))).toBe(0);
});
test('Varios Bookings - La habitación está disponible - Ocupación en agosto 100%', () => {
  const room = new Room({...roomTemplate, bookings: []})
  const booking1 = new Booking({
    name:"Levi Jacobson",
    email: "Osbaldo_OKeefe67@hotmail.com",
    checkin: new Date(2022, 9, 1),
    checkout: new Date(2022, 9, 5),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking2 = new Booking({
    name:"Katie Mitchell",
    email: "Ambrose.OConner37@hotmail.com",
    checkin: new Date(2022, 9, 5),
    checkout: new Date(2022, 9, 15),
    discount: 0,
    room: 'Ocean View Suite'
  });
  const booking3 = new Booking({
    name:"Cecil Heaney",
    email: "Lisa_Mayer@yahoo.com",
    checkin: new Date(2022, 9, 15),
    checkout: new Date(2022, 10, 1),
    discount: 0,
    room: 'Ocean View Suite'
  });
  room.bookings.push(booking1, booking2, booking3);
  expect(room.isOccupied(new Date(2022, 7, 3))).toBe(false);
  expect(room.occupancyPercentage(new Date(2022, 9, 1), new Date(2022, 9, 31))).toBe(100);
});


