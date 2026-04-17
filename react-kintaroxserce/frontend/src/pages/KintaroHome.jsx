import KintaroSlider from "../components/KintaroSlider";
import KintaroFooter from "../components/KintaroFooter";
import KintaroExplore from './KintaroExplore';
import KintaroPopulerContents from '../components/KintaroPopulerContents';

export default function KintaroHome() {
    return (
        <div className='x'>
            <KintaroSlider />

                <KintaroPopulerContents />
                <KintaroExplore />
          

            <KintaroFooter />
        </div>
    )
}
