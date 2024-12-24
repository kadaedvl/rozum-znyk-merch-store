import "./Loading.css";

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner-circle"></div>
            </div>
            <p className="loading-text">Завантаження...</p>
        </div>
    );
};

export default Loading;
