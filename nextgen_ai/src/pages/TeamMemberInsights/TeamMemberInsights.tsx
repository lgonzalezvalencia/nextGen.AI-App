import styles from "./TeamMemberInsights.module.scss";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import StartRecordingButton from "../../components/startRecordingButton/StartRecordingButton";

interface TeamMemberInsightsProps {
  onStartRecording: () => void;
}

const TeamMemberInsights = ({ onStartRecording }: TeamMemberInsightsProps) => {
  return (
    <div className={styles.teamMemberInsightsContainer}>
      <div className={styles.fadeOverlay}></div>
      <div className={styles.teamMemberInsightsContent}>
        <div className={styles.teamMemberInsightsHeader}>
          <BurgerMenu />
        </div>
        <article className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.title}>Team Member Insights</h1>
            <h2 className={styles.candidateName}>Karla Berlanga</h2>
          </header>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Project Information</h3>
            <ul className={styles.infoList}>
              <li>
                <strong className={styles.label}>Client:</strong>
                <span className={styles.value}>US Cellular Corp</span>
              </li>
              <li>
                <strong className={styles.label}>Role:</strong>
                <span className={styles.value}>Product Owner</span>
              </li>
              <li>
                <strong className={styles.label}>Team Lead(s):</strong>
                <span className={styles.value}>Austin Miller</span>
              </li>
              <li>
                <strong className={styles.label}>Start Date:</strong>
                <span className={styles.value}>January 13, 2026</span>
              </li>
              <li>
                <strong className={styles.label}>End Date:</strong>
                <span className={styles.value}>December 31, 2026</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Risk Signals</h3>

            <div className={styles.riskSignals}>
              <div className={styles.riskGrid}>
                <div className={styles.riskItem}>
                  <span className={styles.riskLabel}>Burnout Risk</span>
                  <strong className={styles.riskValue}>6</strong>
                </div>
                <div className={styles.riskItem}>
                  <span className={styles.riskLabel}>Delivery Risk</span>
                  <strong className={styles.riskValue}>7</strong>
                </div>
                <div className={styles.riskItem}>
                  <span className={styles.riskLabel}>Engagement Risk</span>
                  <strong className={styles.riskValue}>4</strong>
                </div>
                <div className={`${styles.riskItem} ${styles.riskTrajectory}`}>
                  <span className={styles.riskLabel}>Risk Trajectory</span>
                  <strong className={styles.riskValue}>Improving</strong>
                </div>
              </div>

              <h4 className={styles.subHeading}>Risk Drivers</h4>
              <ul className={styles.driversList}>
                <li>Workload</li>
                <li>Ambiguity</li>
                <li>Time pressure</li>
                <li>Dependency blockers</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Workload &amp; Capacity Signals
            </h3>

            <ul className={styles.infoList}>
              <li>
                <strong className={styles.label}>
                  Perceived Workload Level:
                </strong>
                <span className={styles.value}>High</span>
              </li>
              <li>
                <strong className={styles.label}>
                  After-Hours Work Mentions:
                </strong>
                <span className={styles.value}>3</span>
              </li>
            </ul>

            <h4 className={styles.subHeading}>Parallel Responsibilities</h4>
            <ul className={styles.parallelList}>
              <li>Feature Delivery</li>
              <li>Support Workload</li>
            </ul>

            <h4 className={styles.subHeading}>Support Dependency Load</h4>
            <ul className={styles.supportList}>
              <li>Handling support tickets</li>
              <li>Responding to production issues</li>
              <li>Assisting other team members</li>
            </ul>

            <p className={styles.predError}>Capacity Mismatch</p>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Delivery &amp; Project Health
            </h3>
            <ul className={styles.infoList}>
              <li>
                <strong className={styles.label}>Delivery Confidence:</strong>
                <span className={styles.value}>Low</span>
              </li>
              <li>
                <strong className={styles.label}>Quality Risk:</strong>
                <span className={styles.value}>High</span>
              </li>
              <li>
                <strong className={styles.label}>
                  Deadline Pressure Mentions:
                </strong>
                <span className={styles.value}>2</span>
              </li>
              <li>
                <strong className={styles.label}>Priority Clarity:</strong>
                <span className={styles.value}>Unclear</span>
              </li>
            </ul>

            <h4 className={styles.subHeading}>Top Blockers</h4>
            <ol className={styles.blockers}>
              <li>High workload</li>
              <li>Support tickets</li>
              <li>Priority ambiguity</li>
            </ol>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Actions &amp; Follow-Ups</h3>

            <h4 className={styles.subHeading}>Recommended Actions</h4>
            <ul className={styles.recommended}>
              <li>Redistribute support tickets</li>
              <li>Clarify short-term priorities</li>
              <li>Follow-up check-in</li>
            </ul>

            <h4 className={styles.subHeading}>Acknowledged By Manager</h4>
            <ul className={styles.acknowledged}>
              <li>Workload redistribution</li>
              <li>Priority clarification</li>
            </ul>

            <ul className={styles.summary}>
              <li>
                <strong className={styles.label}>Pending Actions:</strong>
                <span className={styles.value}>2</span>
              </li>
              <li>
                <strong className={styles.label}>Completed Actions:</strong>
                <span className={styles.value}>0</span>
              </li>
              <li>
                <strong className={styles.label}>Follow-Up:</strong>
                <span className={styles.value}>Scheduled for Feb 5, 2026</span>
              </li>
              <li>
                <strong className={styles.label}>Impact:</strong>
                <span className={styles.value}>TBD</span>
              </li>
            </ul>
          </section>
        </article>
      </div>
      <div className={styles.teamMemberInsightsFooter}>
        <StartRecordingButton onClick={onStartRecording} />
      </div>
    </div>
  );
};

export { TeamMemberInsights };
