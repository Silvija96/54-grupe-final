import { connection } from "../../db.js";

export async function moviesGet(req, res) {
    try {
        const sql = `
            SELECT *
            FROM movies;`;
        const [result] = await connection.execute(sql);
        return res.json({
            status: 'success',
            list: result,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: 'error',
            list: [],
            msg: 'Serverio klaida',
        });
    }
}