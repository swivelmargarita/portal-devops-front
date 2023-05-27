import React from 'react'
import classNames from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import Logo from '../assets/Lookscout-footer.png'
import Social from '../assets/social-icons.png'
import Zaman from '../assets/zamaan-reserved.png'

const WelcomeFooter = (): JSX.Element => {
  return (
    <div className={classNames('container-fluid px-5 py-4', css(styles.container))}>
      <div className={'row'}>
        <div className={'col-4 d-flex flex-column justify-content-between ps-5'}>
          <img src={Logo} alt={'logo'} className={classNames(css(styles.logo))}/>
          <div className={classNames(css(styles.logoText), 'inter-regular mt-2')}>
            Generate outside the box thinking with the possibility to targtet the low.
          </div>

          <img src={Social} alt={'social'} className={classNames(css(styles.social), 'mt-2')}/>
        </div>

        <div className={'col-8'}>
          <div className={'row'}>
            <div className={'col'}>
              <div className={classNames(css(styles.logoText), 'inter-semi-bold')}>Products</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-4')}>Features</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Integrations</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Enterprise</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Solutions</div>
            </div>

            <div className={'col'}>
              <div className={classNames(css(styles.logoText), 'inter-semi-bold')}>Products</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-4')}>Features</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Integrations</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Enterprise</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Solutions</div>
            </div>

            <div className={'col'}>
              <div className={classNames(css(styles.logoText), 'inter-semi-bold')}>Products</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-4')}>Features</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Integrations</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Enterprise</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Solutions</div>
            </div>

            <div className={'col'}>
              <div className={classNames(css(styles.logoText), 'inter-semi-bold')}>Products</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-4')}>Features</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Integrations</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Enterprise</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Solutions</div>
            </div>

            <div className={'col'}>
              <div className={classNames(css(styles.logoText), 'inter-semi-bold')}>Products</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-4')}>Features</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Integrations</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Enterprise</div>

              <div className={classNames(css(styles.logoText), 'inter-semi-bold mt-2')}>Solutions</div>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames('d-flex flex-row justify-content-center mt-3 pt-3')}>
        <img src={Zaman} alt={'zaman'} className={css(styles.zaman)}/>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: COLORS.mainLinearGradient
  },
  logo: {
    width: '40%'
  },
  social: {
    width: '40%'
  },
  logoText: {
    fontSize: 14,
    color: COLORS.white,
    width: '50%'
  },
  zaman: {
    transform: 'scale(0.5)'
  }
})
export default WelcomeFooter
