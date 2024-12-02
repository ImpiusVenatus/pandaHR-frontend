import { AnimatedTestimonials } from "../ui/animated-testimonial";


export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "David Beckham",
      designation: "Product Manager at TechFlow",
      src: "/testimonial/beckham.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Ricardo Kaka",
      designation: "CTO at InnovateSphere",
      src: "/testimonial/kaka.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Zlatan Ibrahimovic",
      designation: "Operations Director at CloudScale",
      src: "/testimonial/zlatan.jpg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
