import { h } from 'preact';
import classNames from 'classnames';

/**
 * Help component.
 * Displays help information
 */
const Help = ({ close, show }) => (
  <div className={classNames('help', { active: show })}>
    <div className="help__content">
      <h2>SAIA could not detect my body. What am I doing wrong?</h2>
      <p>Most likely you either didn't fully fit in the frame or took a wrong pose while taking photos. Please check our video guide once again and try to take photos according to our guidelines. Please note that poor lighting might also affect the results. </p>

      <h2>How accurate is SAIA?</h2>
      <p>Our technology allows us to measure the human body with up to 98% of accuracy. But there might be some issues that decrease accuracy. Thus we advise keeping in mind our recommendations while taking photos.</p>

      <h2>Will the garment that SAIA recommends fit me?</h2>
      <p>While our body measuring technology is accurate, we cannot guarantee that the garment will 100% fit you, because there's always some difference in garment production or inaccuracy in size charts.</p>

      <h2>How do you calculate my size?</h2>
      <p>We match your body measurements determined by SAIA with the size chart of the item you've selected.</p>

      <h2>What if my measurements come in between two sizes?</h2>
      <p>In this case, SAIA will recommend a bigger size.</p>

      <h2>Do I need to upload photos for every item I want to know my size of?</h2>
      <p>No. We keep your measurements and detect your size for every item, so you don't need to upload your photos. However, we recommend updating your measurements once in a while, especially if your physical form has changed.</p>

      <h2>Do you store my photos? Where do they go after I upload them?</h2>
      <p>No, we don't store the photos you upload. Photos are uploaded to our server via a secure channel, processed and then deleted. The only information we keep is your measurements - we use them to make size and fit recommendations.</p>

      <h2>I don't see SAIA Perfect Fit button on some store pages.</h2>
      <p>This means that the seller decided not to use Perfect Fit solution for those items.</p>
    </div>
    <div className="help__footer">
      <button className="help__close button" type="button" onClick={close}>
        <span>Back</span>
      </button>
    </div>
  </div>
);

export default Help;
