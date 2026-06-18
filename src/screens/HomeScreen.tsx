import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProgramStore } from '@store/programStore';
import { useCartStore } from '@store/cartStore';
import { SearchBar } from '@components/SearchBar';
import { CategoryFilter } from '@components/CategoryFilter';
import { ProductGrid } from '@components/ProductGrid';
import { CartBadge } from '@components/CartBadge';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@utils';
import { Program } from '@types';

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const {
    filteredPrograms,
    categories,
    searchQuery,
    search,
    filterByCategory,
  } = useProgramStore();

  const { totalItems } = useCartStore();

  // Mock data - Ganti dengan API call
  React.useEffect(() => {
    const mockPrograms: Program[] = [
      {
        id: '1',
        name: 'Kursus Desain Grafis Profesional',
        description: 'Belajar desain grafis dari dasar hingga mahir',
        price: 299000,
        category: 'desain',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        rating: 4.8,
        reviews: 245,
        duration: '8 minggu',
        level: 'Pemula',
        instructor: 'Budi Hartono',
        schedule: 'Senin-Rabu',
      },
      {
        id: '2',
        name: 'Web Development Bootcamp',
        description: 'Menjadi web developer profesional dalam 3 bulan',
        price: 499000,
        category: 'programming',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        rating: 4.9,
        reviews: 567,
        duration: '12 minggu',
        level: 'Intermediate',
        instructor: 'Ahmad Wijaya',
        schedule: 'Setiap hari',
      },
      {
        id: '3',
        name: 'Digital Marketing Essentials',
        description: 'Strategi marketing digital untuk bisnis online',
        price: 349000,
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        rating: 4.7,
        reviews: 189,
        duration: '6 minggu',
        level: 'Pemula',
        instructor: 'Sarah Meliana',
        schedule: 'Jumat-Minggu',
      },
      {
        id: '4',
        name: 'UI/UX Design Masterclass',
        description: 'Desain interface dan user experience yang menarik',
        price: 399000,
        category: 'desain',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        rating: 4.8,
        reviews: 312,
        duration: '10 minggu',
        level: 'Intermediate',
        instructor: 'Rini Susanto',
        schedule: 'Selasa-Kamis',
      },
      {
        id: '5',
        name: 'Mobile App Development',
        description: 'Buat aplikasi mobile iOS dan Android',
        price: 549000,
        category: 'programming',
        image: 'https://images.unsplash.com/photo-1512941691920-25bdb36c2c59?w=400&h=300&fit=crop',
        rating: 4.9,
        reviews: 423,
        duration: '14 minggu',
        level: 'Advanced',
        instructor: 'Andi Suryanto',
        schedule: 'Harian',
      },
      {
        id: '6',
        name: 'Business & Entrepreneurship',
        description: 'Membangun dan mengelola bisnis sukses',
        price: 279000,
        category: 'bisnis',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        rating: 4.6,
        reviews: 156,
        duration: '8 minggu',
        level: 'Pemula',
        instructor: 'Bambang Santoso',
        schedule: 'Minggu-Jumat',
      },
    ];

    useProgramStore.setState({
      programs: mockPrograms,
      filteredPrograms: mockPrograms,
      categories: [
        { id: 'programming', name: 'Programming', icon: 'code', count: 2 },
        { id: 'desain', name: 'Desain', icon: 'brush', count: 2 },
        { id: 'marketing', name: 'Marketing', icon: 'trending-up', count: 1 },
        { id: 'bisnis', name: 'Bisnis', icon: 'briefcase', count: 1 },
      ],
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Selamat datang 👋</Text>
          <Text style={styles.title}>Temukan Program Terbaik</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.7}
        >
          <Ionicons name="cart" size={24} color={Colors.primary} />
          <CartBadge count={totalItems} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={search}
          onClear={() => search('')}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selected={useProgramStore((state) => state.selectedCategory)}
          onSelectCategory={filterByCategory}
        />

        {/* Programs Grid */}
        <ProductGrid
          programs={filteredPrograms}
          onProgramPress={(program) =>
            navigation.navigate('ProgramDetail', { programId: program.id })
          }
          onAddToCart={(program) => {
            useCartStore.getState().addToCart(program);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  cartButton: {
    position: 'relative',
    padding: Spacing.md,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.lg,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
});