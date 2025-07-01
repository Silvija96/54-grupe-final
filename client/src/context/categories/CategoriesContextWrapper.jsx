
import { useContext, useEffect, useState } from "react";
import { initialCategoriesContext } from "./initialCategoriesContext";
import { CategoriesContext } from "./CategoriesContext";
import { UserContext } from "../user/UserContext";

export function CategoriesContextWrapper(props) {
    const [publicCategories, setPublicCategories] = useState(initialCategoriesContext.publicCategories);
    const [adminCategories, setAdminCategories] = useState(initialCategoriesContext.adminCategories);
    const [featuredCategories, setFeaturedCategories] = useState(initialCategoriesContext.featuredCategories);

    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        if (!isLoggedIn) {
            fetch('http://localhost:5417/api/public/categories', {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        setPublicCategoriesList(data.list);
                    }
                })
                .catch(console.error);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            fetch('http://localhost:5417/api/admin/categories', {
                method: 'GET',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        setAdminCategoriesList(data.list);
                    }
                })
                .catch(console.error);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetch('http://localhost:5417/api/public/categories/featured', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setFeaturedCategoriesList(data.list);
                }
            })
            .catch(console.error);
    }, []);

    function setPublicCategoriesList(data) {
        setPublicCategories(() => data);
    }

    function setAdminCategoriesList(data) {
        setAdminCategories(() => data);
    }

    function setFeaturedCategoriesList(data) {
        setFeaturedCategories(() => data);
    }

    function adminCreateCategory() {
    }

    function adminEditCategory() {
    }

    function adminRemoveCategory() {
    }

    const value = {
        publicCategories,
        featuredCategories,
        adminCategories,
        setPublicCategoriesList,
        setFeaturedCategoriesList,
        setAdminCategoriesList,
        adminCreateCategory,
        adminEditCategory,
        adminRemoveCategory,
    };

    return (
        <CategoriesContext.Provider value={value}>
            {props.children}
        </CategoriesContext.Provider>
    );
}

