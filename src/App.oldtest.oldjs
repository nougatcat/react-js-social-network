import { render } from '@testing-library/react';
import App from './App';

test('renders App', () => {
    render(<App />); 
});


//тест выдает ошибку потому что store передается внутри index, а не внутри App. Перекидывание провайдера в App ломает приложежние. Пока не знаю как сделать так, чтобы тест проходил успешно