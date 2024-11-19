import "./BlogProgressBar.css";

const BlogProgressBar = ({ scrollPos }) => {
    return <div className="ct-blog-progress-bar" style={{
        background:  `linear-gradient(to right, rgba(59, 130, 246, .8) ${scrollPos}, transparent  0)`
    }}></div>
}

export default BlogProgressBar;