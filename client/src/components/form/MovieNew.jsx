
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { CategoriesContext } from "../../context/categories/CategoriesContext";
import { MoviesContext } from "../../context/movies/MoviesContext";
import defaultImg from '../../assets/default.webp';

export function MovieNewForm() {
    const navigate = useNavigate();
    const { movie } = useParams();
    const { adminCategories } = useContext(CategoriesContext);
    const { adminMovies } = useContext(MoviesContext);

    const [img, setImg] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('draft');

    useEffect(() => {
        const movieData = movie ? adminMovies.filter(m => m.url_slug === movie)[0] : null;

        if (movieData) {
            setName(movieData.name);
            setUrl(movieData.url_slug);
            setDescription(movieData.description);
            setStatus(movieData.is_published === 0 ? 'draft' : 'publish');
        }
    }, [adminMovies, movie]);

    function handleResetClick() {
        setName('');
        setUrl('');
        setDescription('');
        setStatus('draft');
    }

    function handleMainFormSubmit(e) {
        e.preventDefault();

        const data = { name, url, status };

        if (img) {
            data.img = img;
        }
        if (description) {
            data.description = description;
        }
        if (minutes) {
            data.minutes = minutes;
        }
        if (hours) {
            data.hours = hours;
        }
        if (category) {
            data.category = category;
        }

        fetch('http://localhost:5417/api/admin/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    // adminRefreshMovies();
                    navigate('/admin/movies');
                }
            })
            .catch(console.error);
    }

    return (
        <>
            <form className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6 mb-3">
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                        <input className="form-control" id="thumbnail" name="thumbnail" type="file" required />
                        <div className="invalid-feedback">
                            Valid image is required.
                        </div>
                    </div>
                    <img id="image" className="col-12" style={{ maxHeight: '20rem', objectFit: 'contain' }} src={img ? img : defaultImg} alt="" />
                </div>
            </form>

            <form onSubmit={handleMainFormSubmit} className="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
                <div className="row g-3">
                    <div className="col-sm-12">
                        <label htmlFor="name" className="form-label">Movie name</label>
                        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" id="name" placeholder="" required />
                        <div className="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="url" className="form-label">URL slug</label>
                        <input onChange={e => setUrl(e.target.value)} value={url} type="text" className="form-control" id="url" placeholder="" required />
                        <div className="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea onChange={e => setDescription(e.target.value)} value={description} className="form-control" id="description" placeholder=""></textarea>
                        <div className="invalid-feedback">
                            Valid description is required.
                        </div>
                    </div>
                    <p className="col-sm-12 mb-0">Duration:</p>
                    <div className="col-sm-6">
                        <label htmlFor="duration_hours" className="form-label">hours</label>
                        <input onChange={e => setHours(+e.target.value)} value={hours} type="number" min="0" max="10" step="1" className="form-control" id="duration_hours" placeholder="" />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="duration_minutes" className="form-label">minutes</label>
                        <input onChange={e => setMinutes(+e.target.value)} value={minutes} type="number" min="0" max="59" step="1" className="form-control" id="duration_minutes" placeholder="" />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="category" className="form-label">Genre</label>
                        <select onChange={e => setCategory(e.target.value)} className="form-control" id="category">
                            <option value="">Choose...</option>
                            {adminCategories.map(c => <option key={c.url_slug} value={c.url_slug}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="my-3">
                        <div className="form-check">
                            <input onChange={() => setStatus('draft')} checked={status === 'draft' ? 'checked' : ''} id="draft" value="draft" name="status" type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="draft">Draft</label>
                        </div>
                        <div className="form-check">
                            <input onChange={() => setStatus('publish')} checked={status === 'publish' ? 'checked' : ''} id="publish" value="publish" name="status" type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="publish">Publish</label>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="d-flex" style={{ gap: '1rem' }}>
                    <button className="btn btn-success btn-lg" type="submit">Create</button>
                    <button onClick={handleResetClick} className="btn btn-secondary btn-lg ms-auto" type="reset">Reset</button>
                </div>
            </form>
        </>
    );
}
