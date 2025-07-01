import { useContext, useEffect, useState } from "react";
import { initialCategoriesContext } from "./initialCategoriesContext";
import { CategoriesContext } from "./CategoriesContext";
import { UserContext } from "../user/UserContext";

export function CategoriesContextWrapper(props) {
    const [categories, setCategories] = useState(initialCategoriesContext.categories);

    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        let apiUrl = 'http://localhost:5417/api/public/categories';

        if (isLoggedIn) {
            apiUrl = 'http://localhost:5417/api/admin/categories';
        }

        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setList(data.list);
                }
            })
            .catch(console.error);
    }, [isLoggedIn]);

    function setList(data) {
        setCategories(() => data);
    }

    function create() {
    }

    function edit() {
    }

    function remove() {
    }

    const value = {
        categories,
        setList,
        create,
        edit,
        remove,
    };

    return (
        <CategoriesContext.Provider value={value}>
            {props.children}
        </CategoriesContext.Provider>
    );
}
