import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TitleComponent } from '../../components/TitleComponent';
import { BodyComponent } from '../../components/BodyComponent';
import { CardProduct } from './components/CardProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR, SECUNDARY_COLOR } from '../../commons/constants';
import { styles } from '../../theme/appTheme';
import { ModalCar } from './components/ModalCar';

//interface - producto
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
}

//interface - arreglo del carrito de compras
export interface Car {
    id: number;
    name: string;
    price: number;
    totalQuantity: number;
}

export const HomeScreen = () => {
    //arreglo de productos
    const products: Product[] = [
        { id: 1, name: 'Helado de Menta', price: 1.80, stock: 5, pathImage: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5B36FEF5-05DE-4E50-AD51-0EE543121D7F/Derivates/0B4F98E3-6C69-480A-AB48-50901E4DBCF0.jpg' },
        { id: 2, name: 'Helado de Vainilla', price: 1.00, stock: 4, pathImage: 'https://www.comedera.com/wp-content/uploads/2022/05/Helado-de-vainilla-sin-azucar.jpg' },
        { id: 3, name: 'Helado de chocolate', price: 2.00, stock: 8, pathImage: 'https://www.comedera.com/wp-content/uploads/2022/04/Helado-de-chocolate-sin-azucar-casero-shutterstock_1418765711.jpg' },
        { id: 4, name: 'Helado de frutilla', price: 2.00, stock: 3, pathImage: 'https://elcordillerano-s2.cdn.net.ar/st2i1700/2022/10/elcordillerano/images/08/67/86719_09682b4afe22da6243e1cb53e93533b8fe0655e9ef6519ae61261ac458996912/lg.jpg' },
        { id: 5, name: 'Helado de queso', price: 4.00, stock: 6, pathImage: 'https://gelatomix.ec/wp-content/uploads/2023/12/MEGAMIX-1024x737.png' },
        { id: 6, name: 'Helado de frutas', price: 2.00, stock: 8, pathImage: 'https://www.hogarmania.com/archivos/202306/helado-frutas-casero-1280x720x80xX.jpg' },
        { id: 7, name: 'Helado de leche', price: 3.50, stock: 5, pathImage: 'https://www.gastronomiaycia.com/wp-content/photos/helado_leche_merengada1.jpg' },
        { id: 8, name: 'Helado de oreo', price: 2.70, stock: 7, pathImage: 'https://cdn0.recetasgratis.net/es/posts/8/1/8/helado_de_oreo_casero_58818_600.jpg' },
        { id: 9, name: 'Sandwich de helado ', price: 4.70, stock: 5, pathImage: 'https://www.gelatecgroup.com/wp-content/uploads/2021/03/sandwich-helado.jpg' },
        { id: 10, name: 'Mochi japonés', price: 6.70, stock: 8, pathImage: 'https://www.gelatecgroup.com/wp-content/uploads/2021/03/helado-mochi-japones.jpg' },
        { id: 11, name: 'Cannolis de helado suave', price: 6.00, stock: 10, pathImage: 'https://www.gelatecgroup.com/wp-content/uploads/2021/03/cannoli-de-helado.jpg'},
        { id: 12, name: 'Helado  de pistacho', price: 8.00, stock: 7, pathImage: 'https://www.gelatecgroup.com/wp-content/uploads/2021/03/spaghettis-helado.jpg' },
        { id: 13, name: 'Helado Spaghetti', price: 8.00, stock: 4, pathImage: 'https://www.gelatecgroup.com/wp-content/uploads/2021/03/helado-frito.jpg' },
        { id: 14, name: 'Cheesecake helada', price: 10.00, stock: 3, pathImage: 'https://www.gelatecgroup.com/wp-content/uploads/2021/03/helado-cheesecake-helada.jpg' },
        { id: 15, name: 'Helado bajo en calorías', price: 9.00 , stock: 3, pathImage:'https://www.gelatecgroup.com/wp-content/uploads/2021/03/helado-bajo-en-calorias.jpg' },
        { id: 16, name: 'Helado Baobing', price: 6.00, stock: 10, pathImage: 'https://www.gelatecgroup.com/wp-content/uploads/2021/03/helado-baobing.jpg' },
        
    ];

    //hook useState: manipular el estado del arreglo de productos
    const [productsState, setProductsState] = useState(products);

    //hook useSate: manipulas el estado del arreglo del carrito de compras
    const [car, setCar] = useState<Car[]>([]);

    //hook useState: manipular la visualización del modal
    const [showModal, setShowModal] = useState<boolean>(false);

    //función para actualizar el stock de productos
    const changeStockProduct = (idProduct: number, quantity: number) => {
        //generar un nuevo arreglo con las actualizaciones del stock
        const updateStock = productsState.map(product => product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product);
        //Actualizar el productsState
        setProductsState(updateStock);
        //llamar la función para agregar al carrito
        addProduct(idProduct, quantity);
    }

    //función para agregar los productos al carrito
    const addProduct = (idProduct: number, quantity: number) => {
        //Buscar el producto que se agregará en el carrito
        const product = productsState.find(product => product.id === idProduct);
        //Controlar si el producto no ha sido encontrado
        if (!product) {
            return;
        }
        //Verificar si el producto ya está en el carrito
        const productInCar = car.find(item => item.id === idProduct);
        if (productInCar) {
            //Actualizar la cantidad total si ya está en el carrito
            const updatedCar = car.map(item =>
                item.id === idProduct
                    ? { ...item, totalQuantity: item.totalQuantity + quantity }
                    : item
            );
            setCar(updatedCar);
        } else {
            //Si no está en el carrito, agregarlo
            const newProductCar: Car = {
                id: product.id,
                name: product.name,
                price: product.price,
                totalQuantity: quantity
            };
            setCar([...car, newProductCar]);
        }
        
    };

    //función para realizar la compra
    const deleteCar = () => {
        //Vaciar el carrito
        setCar([]);
        //Cerrar el modal
        setShowModal(false);
    };

    return (
        <View>
            <View style={styles.contentHeaderHome}>
                <TitleComponent title='Productos' />
                <View style={styles.iconCardHome}>
                    <Text style={styles.textIconCard}>{car.length}</Text>
                    <Icon
                        name='shopping-cart'
                        size={33}
                        color={car.length > 0 ? SECUNDARY_COLOR : 'gray'} // deshabilitar si el carrito está vacío
                        onPress={() => car.length > 0 && setShowModal(!showModal)} // solo abrir modal si hay productos
                    />
                </View>
            </View>
            <BodyComponent>
                <FlatList
                    data={productsState}
                    renderItem={({ item }) => <CardProduct product={item} changeStockProduct={changeStockProduct} />}
                    keyExtractor={item => item.id.toString()} />
            </BodyComponent>
            {showModal && (
                <ModalCar
                    isVisible={showModal}
                    car={car}
                    setShowModal={() => setShowModal(!showModal)}
                     deleteCar={deleteCar}// añadir función para completar la compra
                />
            )}
        </View>
    );
};
