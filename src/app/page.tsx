import Header from '@/components/common/Header';
import Hero from '@/components/common/Hero';
import FeaturesSection from '@/components/common/FeaturesSection';
import ProductSection from '@/components/common/ProductSection';
// import InsightsDashboard from '@/components/common/InsightsDashboard';
import Testimonials from '@/components/common/Testimonials';
import CTASection from '@/components/common/CTASection';
import Footer from '@/components/common/Footer';
import SearchForm from '@/components/forms/SearchForm';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section className="py-8 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-delon text-dark mb-4">Find Fresh Produce</h2>
            <SearchForm />
          </div>
        </section>
        <Hero />
        <FeaturesSection />
        <ProductSection />
        {/* <InsightsDashboard /> */}
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}