class App{

    constructor(){
        this.heroImages=[...document.querySelectorAll('.hero__images img')];
        this.text__effects=[...document.querySelectorAll('.text__effect')];
        this._initialise();
        this._render();
    }


    _initialise(){
        this._setInitialStates();
        this._createLines();
        this._initIntro();
        this._createHero();
        this._createEffects();
        this._createPinned();
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

    _createEffects(){
        const tl = gsap.timeline(
            {scrollTrigger:{
            trigger:'.text-block',
            start:'top center-=40%',
            end:'bottom top',
            scrub:true,
            markers:true
        }});

        this.text__effects.forEach((effect,index)=>{
            const overlay= effect.querySelector('.text__overlay');
            const text = effect.querySelector('p');
            tl.to(overlay,{
                scaleX:0,
                duration:3
            }).to(text,{
                y:0,
                opacity:1,
                duration:1,
                ease:'expo.out',
                delay:()=>index * 0.1
            },0)
        });
    }

    _createPinned(){
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:'.fullwidth-image',
                start:'top top',
                end:'=1500',
                scrub:true,
                pin:true,
                markers:true
            }
        });

        tl.to('.fullwidth-image__overlay',{
            opacity:0.3,
        }).to('.fullwidth-image',{
            ease:'expo.out',
            "clip-path":"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        }).
        to('.fullwidth-image img',{
            scale:1,
            duration:1
        }).
        to('.fullwidth-image__text',{
            y:0,
            opacity:1,
            duration:1
        },0)
    }

    _render(time){
        this.lenis.raf(time)
        requestAnimationFrame(this._render.bind(this))
    }
}

new App();