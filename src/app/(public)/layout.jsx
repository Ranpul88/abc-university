import Footer from "../components/footer";
import Header from "../components/header";

export default function publicLayout({ children }){
    return(
        <div className="w-full h-full">
            <Header />
            <div className="w-full min-h-[calc(100%-117px)]">{children}</div>
            <Footer />
        </div>
    )
}