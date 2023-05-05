export default {
  /* workshops: {
    title: 'Workshops — Kubernetes Community Days',
    description:
      'We have an exciting lineup of hands-on workshop where you can put your skills to the test and learn from experts. We have something for everyone. Take advantage of this',
  },
  workshopArgo: {
    title: 'Workshop GitOps with ArgoCD — Kubernetes Community Days',
    description:
      'This one-day training in German or English offers a practical and clearly understandable introduction to GitOps using Argo CD on Kubernetes.',
  },
  workshopGo: {
    title: 'Workshops Go Basics — Kubernetes Community Days',
    description:
      'This one-day training in German or English offers an introduction to Go for software developers, architects and DevOps engineers.',
  },
  workshopCilium: {
    title: 'Workshops Cilium Basics — Kubernetes Community Days',
    description:
      'This one-day training in English or German provides a practical and clear introduction to Cilium, an eBFP-based networking, observability and security stack for cloud and on-premise infrastructure.',
  },
  workshopKubernetes: {
    title: 'Workshops Kubernetes Basics — Kubernetes Community Days',
    description:
      'This one-day training in German or English provides a practical and easy-to-understand introduction to Kubernetes.',
  }, */
  team: {
    title: 'Team — Kubernetes Community Days',
    description: 'Experience the power of community at the Kubernetes Community Days in Munich!',
  },
  static: ({ title }) => ({
    title: `${title} — Kubernetes Community Days`,
  }),

  page404: {
    title: 'Page Not Found — Kubernetes Community Days',
    description: 'Sorry, we couldn’t find the page you’re looking for',
  },
};
