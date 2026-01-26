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
      <div className={styles.burgerMenuWrapper}>
        <BurgerMenu />
      </div>
      <div className={styles.teamMemberInsightsContent}>
        <article className={styles.card}>
          <header className={styles.header}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className={styles.title}>Team Member Insights</h1>
            <h2 className={styles.candidateName}>Karla Berlanga</h2>
          </header>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Project Information</h3>
            <ul className={styles.infoList}>
              <li>
                <span className={styles.label}>Client: </span>
                <span className={styles.value}>US Cellular Corp</span>
              </li>
              <li>
                <span className={styles.label}>Role: </span>
                <span className={styles.value}>Product Owner</span>
              </li>
              <li>
                <span className={styles.label}>Team Lead(s): </span>
                <span className={styles.value}>Austin Miller</span>
              </li>
              <li>
                <span className={styles.label}>Start Date: </span>
                <span className={styles.value}>January 13, 2026</span>
              </li>
              <li>
                <span className={styles.label}>End Date: </span>
                <span className={styles.value}>December 31, 2026</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Risk Signals</h3>
            <ul className={styles.riskSignals}>
              <li>
                <span className={styles.label}>Burnout Risk: </span>
                <span className={styles.value}>6</span>
              </li>
              <li>
                <span className={styles.label}>Delivery Risk: </span>
                <span className={styles.value}>7</span>
              </li>
              <li>
                <span className={styles.label}>Engagement Risk: </span>
                <span className={styles.value}>4</span>
              </li>
              <li>
                <span className={styles.label}>Risk Trajectory: </span>
                <span className={styles.value}>Improving</span>
              </li>
            </ul>
            <span className={styles.label}>Risk Drivers: </span>
            <ul className={styles.driversList}>
              <li>Workload</li>
              <li>Ambiguity</li>
              <li>Time pressure</li>
              <li>Dependency blockers</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Workload &amp; Capacity Signals</h3>
            <ul className={styles.infoList}>
              <li>
                <span className={styles.label}>Perceived Workload Level: </span>
                <span className={styles.value}>High</span>
              </li>
              <li>
                <span className={styles.label}>After-Hours Work Mentions: </span>
                <span className={styles.value}>3</span>
              </li>
            </ul>
            <span className={styles.label}>Parallel Responsibilities</span>
            <ul className={styles.parallelList}>
              <li>Feature Delivery</li>
              <li>Support Workload</li>
            </ul>
            <span className={styles.label}>Support Dependency Load</span>
            <ul className={styles.supportList}>
              <li>Handling support tickets</li>
              <li>Responding to production issues</li>
              <li>Assisting other team members</li>
            </ul>
            <span className={styles.predError}>Capacity Mismatch</span>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Delivery &amp; Project Health</h3>
            <ul className={styles.infoList}>
              <li>
                <span className={styles.label}>Delivery Confidence: </span>
                <span className={styles.value}>Low</span>
              </li>
              <li>
                <span className={styles.label}>Quality Risk: </span>
                <span className={styles.value}>High</span>
              </li>
              <li>
                <span className={styles.label}>Deadline Pressure Mentions: </span>
                <span className={styles.value}>2</span>
              </li>
              <li>
                <span className={styles.label}>Priority Clarity: </span>
                <span className={styles.value}>Unclear</span>
              </li>
            </ul>
            <span className={styles.label}>Top Blockers</span>
            <ul className={styles.blockersList}>
              <li>High workload</li>
              <li>Support tickets</li>
              <li>Priority ambiguity</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Actions &amp; Follow-Ups</h3>
            <span className={styles.label}>Recommended Actions</span>
            <ul className={styles.recommendedList}>
              <li>Redistribute support tickets</li>
              <li>Clarify short-term priorities</li>
              <li>Follow-up check-in</li>
            </ul>
            <span className={styles.label}>Acknowledged By Manager</span>
            <ul className={styles.acknowledgedList}>
              <li>Workload redistribution</li>
              <li>Priority clarification</li>
            </ul>
            <ul className={styles.actionsList}>
              <li>
                <span className={styles.label}>Pending Actions: </span>
                <span className={styles.value}>2</span>
              </li>
              <li>
                <span className={styles.label}>Completed Actions: </span>
                <span className={styles.value}>0</span>
              </li>
              <li>
                <span className={styles.label}>Follow-Up: </span>
                <span className={styles.value}>Scheduled for Feb 5, 2026.</span>
              </li>
              <li>
                <span className={styles.label}>Impact: </span>
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
