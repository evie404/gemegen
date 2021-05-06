interface Custom404Props {
  title?: string;
  message?: string;
}

const Custom404 = (props: Custom404Props): JSX.Element => (
  <div>
    <h1>404 - {props.title || "Page Not Found"}</h1>
    <p>{props.message}</p>
  </div>
);

export default Custom404;
