import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function categoriesPut(req, res) {
    const [errParams, msgParams] = IsValid.requiredFields(req.params, [
        { field: 'id', validation: IsValid.idAsString },
    ]);

    if (errParams) {
        return res.json({
            status: 'error',
            msg: msgParams,
        });
    }

    const [err, msg] = IsValid.requiredFields(req.body, [
        { field: 'name', validation: IsValid.nonEmptyString },
        { field: 'url', validation: IsValid.urlSlug },
        { field: 'description', validation: IsValid.nonEmptyString },
        { field: 'status', validation: IsValid.includesInList, options: ['draft', 'publish'] },
    ]);

    if (err) {
        return res.json({
            status: 'error',
            msg: msg,
        });
    }

    const { name, url, description, status } = req.body;

    try {
        const sql = 'SELECT * FROM categories WHERE (name = ? OR url_slug = ?) AND id != ?;';
        const [result] = await connection.execute(sql, [name, url, +req.params.id]);

        if (result.length > 0) {
            return res.json({
                status: 'error',
                msg: 'Tokia filmu kategorija jau egzistuoja.',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite kategorija atnaujinti veliau',
        });
    }

    try {
        const sql = `
            UPDATE categories
            SET name = ?, url_slug = ?, description = ?, is_published = ?
            WHERE id = ?;`;
        const [result] = await connection.execute(sql, [name, url, description, status === 'publish' ? 1 : 0, +req.params.id]);

        if (result.affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Serverio klaida, pabandykite kategorija atnaujinti veliau',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Serverio klaida, pabandykite kategorija atnaujinti veliau',
        });
    }

    return res
        .json({
            status: 'success',
            msg: 'Filmu kategorija atnaujinta sekmingai',
        });
}