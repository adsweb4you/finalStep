export function Reviews(max, Prodrev){
    let RewHtml = '';
    for (let i = 0; i < max; i++) {
        let icon = i < Math.ceil(Prodrev) ? 'star.svg' : 'starempt.svg'
         
        let StarType = `<img src="public/images/icons/${icon}" alt="">`
        RewHtml += StarType;
    }

    return RewHtml;
}


export function Segment(){
    let page = window.location.href.split('/');
    page = page[page.length - 1]
    
    return page;
}