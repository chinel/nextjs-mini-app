import Link from "next/Link";

function Button(props) {
  return <Link href={props.link}>{props.children}</Link>;
}

export default Button;
