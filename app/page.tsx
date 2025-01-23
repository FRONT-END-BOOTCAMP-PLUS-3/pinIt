import Confirmation from '@/components/Confirmation/Confirmation';
import Icon from '@/components/Icon/Icon';

export default function Home() {
  return (
    <div>
      <div style={{ backgroundColor: 'black' }}>
        <Icon id='home' />
        <Icon id='home-bold' />
      </div>
      <div>ㅎㅇ안녕하세요!! 이거 프리텐다드 맞나</div>
      <Confirmation text='확인해주세요' />
      <div>
        hi Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, eius
        deserunt, illum quas aliquid expedita numquam facere maiores
        perferendis, deleniti explicabo commodi dicta quasi id. Deserunt fugit
        ipsam minima quasi?
      </div>
    </div>
  );
}
