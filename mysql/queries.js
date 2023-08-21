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
  updateYear: (id, year) => {
    return `UPDATE cars_table SET year = "${year}"
                WHERE id LIKE "${id}";`;
  },
  updateModel: (id, model) => {
    return `UPDATE cars_table SET model = "${model}"
                WHERE id LIKE "${id}";`;
  },
  updateMake: (id, make) => {
    return `UPDATE cars_table SET make = "${make}"
                WHERE id LIKE "${id}";`;
  },
  updateType: (id, type) => {
    return `UPDATE cars_table SET type = "${type}"
                WHERE id LIKE "${id}";`;
  },
  getAllCars: () => {
    return `SELECT id, year, make, model, type, user_id
                FROM cars_table`;
  },
};
