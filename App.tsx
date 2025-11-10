import { Eye, MapPin, Clock, Phone, Mail, Award, Glasses, Users, ShoppingBag, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  in_stock: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [loading, setLoading] = useState(true);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Todos', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/image.png" alt="Ótica Acaz" className="h-16 w-16 object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-amber-400">Ótica Acaz</h1>
                <p className="text-sm text-gray-300">Desde 1976</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-amber-400 transition-colors">Início</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">Sobre</a>
              <a href="#products" className="hover:text-amber-400 transition-colors">Produtos</a>
              <a href="#services" className="hover:text-amber-400 transition-colors">Serviços</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img src="/image.png" alt="Ótica Acaz" className="h-48 w-48 mx-auto mb-8 object-contain" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-amber-400">A sua ótica de confiança</h2>
            <p className="text-2xl mb-4 text-gray-200">Desde 1976</p>
            <p className="text-xl mb-8 text-gray-300">Tradição, qualidade e cuidado com a sua visão há quase 50 anos</p>
            <a href="#contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">
              Agende sua visita
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossa História</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-full mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quase 50 anos</h3>
                <p className="text-gray-600 leading-relaxed">
                  Desde 1976 servindo com excelência e dedicação
                </p>
              </div>

              <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-full mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Confiança</h3>
                <p className="text-gray-600 leading-relaxed">
                  Milhares de clientes satisfeitos ao longo das gerações
                </p>
              </div>

              <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 text-white rounded-full mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualidade</h3>
                <p className="text-gray-600 leading-relaxed">
                  Produtos e serviços de primeira linha para sua visão
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-12 rounded-2xl shadow-xl">
              <p className="text-xl md:text-2xl leading-relaxed text-center">
                A <strong>Ótica Acaz</strong> é mais do que uma loja de óculos. Somos uma família que cuida da saúde visual da sua família há quase cinco décadas. Com profissionais qualificados e produtos das melhores marcas, garantimos que você enxergue o mundo com clareza e estilo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShoppingBag className="w-10 h-10 text-amber-500" />
                <h2 className="text-4xl font-bold text-gray-900">Nossos Produtos</h2>
              </div>
              <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 text-lg">Coleção exclusiva de armações e óculos de qualidade</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-gray-900 shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Carregando produtos...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3962278/pexels-photo-3962278.jpeg';
                        }}
                      />
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">Fora de Estoque</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-semibold text-amber-500 uppercase mb-2">{product.category}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-500">R$ {product.price.toFixed(2)}</span>
                        <button
                          disabled={!product.in_stock}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            product.in_stock
                              ? 'bg-amber-500 text-gray-900 hover:bg-amber-600 cursor-pointer'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {product.in_stock ? 'Comprar' : 'Indisponível'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <Glasses className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Óculos de Grau</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Grande variedade de armações modernas e clássicas, com lentes de alta qualidade e tecnologia
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Óculos de Sol</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Proteção UV completa com estilo. Marcas renomadas e modelos exclusivos
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Exames de Vista</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Avaliação completa da saúde ocular com equipamentos modernos e precisos
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Ajustes e Reparos</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Manutenção e conserto de armações com agilidade e precisão
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Visite-nos</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Endereço</h3>
                    <p className="text-gray-600">
                      Rua Dr Flaquer, N° 209<br />
                      Centro - SBC<br />
                      CEP 00000-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Horário de Funcionamento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta: 08:30h às 17:30h<br />
                      Sábado: 9h às 16:30h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Telefone</h3>
                    <p className="text-gray-600">(11) 95810-3641</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">contato@oticaacaz.com.br</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-amber-400 mb-6">Entre em Contato</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Nome</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Telefone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Mensagem</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-amber-500 focus:outline-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 rounded-lg transition-colors">
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-6 md:mb-0">
                <img src="/image.png" alt="Ótica Acaz" className="h-16 w-16 object-contain" />
                <div>
                  <h3 className="text-xl font-bold text-amber-400">Ótica Acaz</h3>
                  <p className="text-sm text-gray-300">A sua ótica de confiança desde 1976</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-300">&copy; 2025 Ótica Acaz. Todos os direitos reservados.</p>
              </div>
            
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
