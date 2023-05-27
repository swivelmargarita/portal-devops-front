import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import classNames from 'classnames'
import WelcomeMainCard from './WelcomeMainCard'
import Button from './Button'
import HeadlineHero from './HeadlineHero'
import WelcomeFooterCard from './WelcomeFooterCard'
import { COLORS } from '../utils/colors'
import HeadlineImage1 from '../assets/headline-1.png'
import HeadlineImage2 from '../assets/headline-2.png'
import HeadlineImage3 from '../assets/headline-3.png'
import FooterCardImage1 from '../assets/welcome-footer-card-1.png'
import FooterCardImage2 from '../assets/welcome-footer-card-2.png'
import FooterCardImage3 from '../assets/welcome-footer-card-3.png'
import WelcomePreFooter from './WelcomePreFooter'
import WelcomeFooter from './WelcomeFooter'

const WelcomeMain = (): JSX.Element => {
  const info = [
    {
      title: 'Enterprise-grade security'
    },
    {
      title: '99.9% guaranteed uptime SLA'
    },
    {
      title: 'Designated customer success team'
    }
  ]
  return (
    <div className={'d-flex flex-column justify-content-between align-items-center'}>
      <div className={'mt-5'}>
        <div className={classNames('text-center inter-semi-bold', css(styles.title))}>This is a headline</div>

        <div className={classNames('text-center inter-regular', css(styles.subtitle))}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the <br/>
          industry's standard dummy text ever since the 1500s,
        </div>
      </div>

      <div className={classNames('d-flex flex-row justify-content-between flex-wrap mt-5', css(styles.container))}>
        <WelcomeMainCard />
        <WelcomeMainCard />
        <WelcomeMainCard />
        <WelcomeMainCard />
        <WelcomeMainCard />
        <WelcomeMainCard />
      </div>

      <div className={'my-3'}>
        <Button
          title={'Primary'}
          background={COLORS.blue}
          width={'100%'}
          titleColor={COLORS.white}
          paddingX={5}
        />
      </div>

      <div className={'mt-5'}>
        <div className={classNames('text-center inter-semi-bold', css(styles.title))}>This is a headline</div>

        <div className={classNames('text-center inter-regular', css(styles.subtitle))}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the <br/>
          industry's standard dummy text ever since the 1500s,
        </div>
      </div>

      <HeadlineHero
        img={ HeadlineImage1 }
        buttonBackground={ COLORS.blue }
        buttonTitleColor={ COLORS.white }
        preTitle={'1% OF THE INDUSTRY'}
        title={'Demonstrate branding consequently think outside the \n' +
          'box and beyond.'}
        subtitle={'Velit purus egestas tellus phasellus. Mattis eget sed faucibus magna vulputate pellentesque a diam ' +
          'tincidunt. Aenean malesuada tellus tellus faucibus mauris quisque mauris in.'}
      />

      <HeadlineHero
        img={ HeadlineImage2 }
        left={ true }
        buttonBackground={ COLORS.white }
        buttonTitleColor={ COLORS.black }
        backgroundImage={COLORS.mainLinearGradient}
        width={'90%'}
        preTitle={'1% OF THE INDUSTRY'}
        title={'Demonstrate branding consequently think outside the \n' +
          'box and beyond.'}
        subtitle={'Velit purus egestas tellus phasellus. Mattis eget sed faucibus magna vulputate pellentesque a diam ' +
          'tincidunt. Aenean malesuada tellus tellus faucibus mauris quisque mauris in.'}
      />

      <HeadlineHero
        img={HeadlineImage3}
        buttonBackground={ COLORS.blue }
        buttonTitleColor={ COLORS.white }
        title={'Demonstrate branding consequently think outside the \n' +
          'box and beyond.'}
        subtitle={'Velit purus egestas tellus phasellus. Mattis eget sed faucibus magna vulputate pellentesque a diam ' +
          'tincidunt. Aenean malesuada tellus tellus faucibus mauris quisque mauris in.'}
        info={info}
      />

      <div className={'my-5'}>
        <div className={classNames('text-center inter-semi-bold', css(styles.title))}>This is a headline</div>

        <div className={classNames('text-center inter-regular', css(styles.subtitle))}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the <br/>
          industry's standard dummy text ever since the 1500s,
        </div>
      </div>

      <div className={classNames(css(styles.footerCardContainer), 'd-flex flew-row justify-content-between flex-wrap my-5')}>
        <WelcomeFooterCard
          image={FooterCardImage1}
          date={'25 Apr. 2022'}
          title={'Organize your digital assets \n' +
            'with a new methodology.'}
          description={'Leverage agile frameworks to provide a robust synopsis for high level overviews. ' +
            'Iterative approaches to corporate.'}
          labelColor={COLORS.blue}
        />

        <WelcomeFooterCard
          image={FooterCardImage2}
          date={'25 Apr. 2022'}
          title={'Faster ways to reach your customers and their needs.'}
          description={'Capitalize on low hanging fruit to identify a ballpark value added activity to beta' +
            ' test override the digital divide.'}
          labelColor={COLORS.welcomeCardButton}
        />

        <WelcomeFooterCard
          image={FooterCardImage3}
          date={'25 Apr. 2022'}
          title={'Gestalt psychology in UI/UX\n' +
            'design and beyond.'}
          description={'Bring to the table win-win strategies to proactive domination. ' +
            'At the end of the day, going forward.'}
          labelColor={COLORS.blue}
        />
      </div>

      <WelcomePreFooter />

      <WelcomeFooter />
    </div>
  )
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 3
  },
  subtitle: {
    color: COLORS.welcomeMainSubtitle,
    fontSize: 16
  },
  container: {
    width: '85%'
  },
  footerCardContainer: {
    width: '90%'
  }
})

export default WelcomeMain
