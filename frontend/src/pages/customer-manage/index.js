import { asyncComponent } from '@/utils/utils';
export default asyncComponent(async () => {
    try {
        const module = await import('./manage');
        return module.default;
    } catch (error) {
        console.log(error);
    }
    return null;
});