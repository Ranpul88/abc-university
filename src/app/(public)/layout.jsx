import Footer from "../components/footer";
import Header from "../components/header";

export default function publicLayout({ children }){
    return(
        <div className="w-full h-full">
            <Header />
            <div className="w-full">{children}</div>
            <Footer />
        </div>
    )
}