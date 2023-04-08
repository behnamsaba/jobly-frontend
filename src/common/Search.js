const Search = ({ formik }) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                id="name"
                type="text"
                {...formik.getFieldProps('name')}
                placeholder="Enter Search Term"
            />

            {/* backend error handling*/}
            {formik.errors.backendError ? (
                <div>{formik.errors.backendError}</div>
            ) : null}

            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
