import Router from "next/router";

const redirect = async (context, target) => {
  if (context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    await Router.replace(target);
  }
};

export default redirect;
