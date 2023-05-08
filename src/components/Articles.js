function Articles(props) {
    return(
        <div>
            <h6>
                {props.id}
            </h6>
            <h3>
                {props.title}
            </h3>
            <p>
                {props.body}
            </p>
            <p>
                {props.published ? "Published" : "Not published" }
            </p>
            {props.onSelect && (
        <button onClick={props.onSelect}>View this article</button>
      )}
        </div>
    )
}

export default Articles;
//{props.published ? "Published: " + props.title : "To be published: " + props.title}