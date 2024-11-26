import bcrypt from 'bcrypt';
import client from '../utils/database.js';

const userModel = {
    getAllUsers: async () => {
        const query = `
            SELECT * FROM users
            ORDER BY id ASC
        `;
        const { rows } = await client.query(query);
        return rows;
    },

    findByPk: async (id) => {
        const query = `
            SELECT * FROM users
            WHERE id = $1
        `;
        const { rows } = await client.query(query, [id]);
        return rows[0]; // Return the first user found
    },
    findByEmail: async (email) => {
        const query = `
            SELECT * FROM users
            WHERE email = $1
        `;
        const { rows } = await client.query(query, [email]);
        return rows[0]; // Trả về người dùng đầu tiên tìm thấy
    },
    emailExists: async (email) => {
        const query = `
            SELECT 1 FROM users
            WHERE email = $1
        `;
        const { rowCount } = await client.query(query, [email]);
        return rowCount > 0; // Return true if email exists
    },
    create: async ({ name, email, password, status }) => {
        if (!name || !email || !password) {
            throw new Error("Name, email, and password are required");
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = `
            INSERT INTO users (name, email, password, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const { rows } = await client.query(query, [name, email, hashedPassword, status]);
        return rows[0]; // Return the newly created user
    },


    update: async ({ name, email, password, status }, id) => {
        const query = `
            UPDATE users
            SET name = $1, 
                email = $2,
                password = $3,
                status = $4, 
                updated_at=now()
            WHERE id = $5
            RETURNING *
        `;
        const { rows } = await client.query(query, [name, email, password, status, id]);
        return rows[0];
    },

    delete: async (id) => {
        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING *
        `;
        const { rows } = await client.query(query, [id]);
        return rows[0];
    }
};

export default userModel;
