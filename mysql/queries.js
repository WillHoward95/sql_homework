module.exports = {
  addUser: (email, password) => {
    return `INSERT INTO users
        (email, password)
            VALUES 
            ("${email}", "${password}")`;
  },
  getCar: (id) => {
    return `SELECT id, year, make, model, type
                FROM cars_table
                    WHERE id LIKE ${id}`;
  },
  addCar: (year, make, model, type, userId) => {
    return `INSERT INTO cars_table
                (year, make, model, type, user_id)
                    VALUES
                        ("${year}", "${make}", "${model}", "${type}", "${userId}")`;
  },
  selectToDelete: (id) => {
    return `SELECT id, year, make, model, type
                FROM cars_table
                    WHERE id LIKE ${id}`;
  },
  deleteCar: (id) => {
    return `DELETE FROM cars_table 
                WHERE id LIKE ${id}`;
  },
  selectToUpdate: (id) => {
    return `SELECT id, year, make, model, type
                FROM cars_table
                    WHERE id LIKE ${id}`;
  },
  updateCar: (id, key, value) => {
    return `UPDATE cars_table SET ${key} = "${value}"
                WHERE id LIKE "${id}";`;
  },
  getAllCars: () => {
    return `SELECT id, year, make, model, type, user_id
                FROM cars_table`;
  },
};
