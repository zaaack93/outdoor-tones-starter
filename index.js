class App{

    constructor(){
        this.heroImages=[...document.querySelectorAll('.hero__images img')];
        this._initialise();
        this._render();
    }


    _initialise(){
        this._setInitialStates();
        this._createLines();
        this._initIntro();
        this._createHero();
    }

    _setInitialStates(){
        gsap.set('.hero__title span,.text__effect p,.fullwidth-image__text',{
            y:32,
            opacity:0
        })

        gsap.set('.hero__images img',{
            opacity:0,
            y:gsap.utils.random(100,50)
        })

        gsap.set('.fullwidth-image img',{
            scale:1.3
        })
    }

    _initIntro(){
        const t = gsap.timeline();

        t.to('.hero__title div',{
            opacity:1}).to('.hero__title span',{
                opacity:1,
                y:0,
                duration:2,
                ease:'expo.out',
                stagger:0.01
            }).to('.hero__images img',{
                opacity:1,
                y:0,
                duration:2,
                ease:'power3.out',
                stagger:0.04
            },0.5)
    }

    _createLines(){
        this.lenis = new Lenis({
            lerp:0.5,
        })

    }

    _createHero(){
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:'.hero',
                start:'top top',
                end:'bottom top',
                scrub:true,
                markers:true
            }
        });

        this.heroImages.forEach((img,index)=>{
            tl.to(img,{
                ease: "none",
                yPercent: gsap.utils.random(-100,-50),
            },0)
        })
    }

    _render(time){
        this.lenis.raf(time)
        requestAnimationFrame(this._render.bind(this))
    }
}

new App();