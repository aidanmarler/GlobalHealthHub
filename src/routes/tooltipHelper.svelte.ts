let tooltipContents = $state('');

export function getTooltip() {
    function changeContent(content: string) {
        tooltipContents = content;
    }

    return {
        get content() {
            return tooltipContents;
        },
        changeContent
    };
}

export let tooltip = $state({ content: '' });