import { definePlugin } from "astro-expressive-code";

function addClassName(className: string) {
    return definePlugin({
        name: 'addClassName',
        hooks: {
            postprocessRenderedBlockGroup: (context) => {
                const prevClassName = context.renderData.groupAst.properties.className as Array<string>;
                prevClassName.push(className);
            }
        },
    })
}

export { addClassName };

